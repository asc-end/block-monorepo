package expo.modules.appblocker

import android.app.AppOpsManager
import android.app.usage.UsageStatsManager
import android.content.Context
import android.content.Intent
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.drawable.BitmapDrawable
import android.graphics.drawable.Drawable
import android.net.Uri
import android.os.Build
import android.os.Process
import android.provider.Settings
import android.util.Log
import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.util.Base64
import java.io.ByteArrayOutputStream
import java.util.Calendar
import java.util.Date
import java.util.TimeZone
import java.text.SimpleDateFormat

class AppBlockerModule : Module() {
  private val context: Context
    get() = appContext.reactContext ?: throw IllegalStateException("React context is null")

  private fun hasUsageStatsPermission(): Boolean {
    val appOpsManager = context.getSystemService(Context.APP_OPS_SERVICE) as AppOpsManager?
    if (appOpsManager == null) {
        return false
    }
    // MODE_ALLOWED is the only one that means permission granted
    val mode = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
        appOpsManager.unsafeCheckOpNoThrow(
            AppOpsManager.OPSTR_GET_USAGE_STATS,
            Process.myUid(),
            context.packageName
        )
    } else {
        @Suppress("DEPRECATION") // Needed for older Android versions
        appOpsManager.checkOpNoThrow(
            AppOpsManager.OPSTR_GET_USAGE_STATS,
            Process.myUid(),
            context.packageName
        )
    }
    return mode == AppOpsManager.MODE_ALLOWED
  }
  
  private fun hasOverlayPermission(): Boolean {
    return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      Settings.canDrawOverlays(context)
    } else {
      true // Before Android M, this permission was granted at install time
    }
  }

  private fun hasNotificationListenerPermission(): Boolean {
    val packageName = context.packageName
    val flat = Settings.Secure.getString(context.contentResolver, "enabled_notification_listeners")
    return flat?.contains(packageName) == true
  }

  private fun isNotificationBlockingEnabled(): Boolean {
    val prefs = context.getSharedPreferences("app_blocker_prefs", Context.MODE_PRIVATE)
    return prefs.getBoolean("notification_blocking_enabled", false)
  }

  private fun setNotificationBlockingEnabled(enabled: Boolean) {
    val prefs = context.getSharedPreferences("app_blocker_prefs", Context.MODE_PRIVATE)
    prefs.edit().putBoolean("notification_blocking_enabled", enabled).apply()
  }
    // Add this function to mark focus session end
  private fun markFocusSessionEnd() {
    try {
      val prefs = context.getSharedPreferences("app_blocker_stats", Context.MODE_PRIVATE)
      prefs.edit().putLong("last_focus_session_end", System.currentTimeMillis()).apply()
    } catch (e: Exception) {
      Log.e("AppBlockerModule", "Error marking focus session end", e)
    }
  }

  // Helper function to convert a drawable to bitmap
  private fun drawableToBitmap(drawable: Drawable): Bitmap {
    if (drawable is BitmapDrawable) {
      if (drawable.bitmap != null) {
        return drawable.bitmap
      }
    }
    
    val bitmap = if (drawable.intrinsicWidth <= 0 || drawable.intrinsicHeight <= 0) {
      Bitmap.createBitmap(1, 1, Bitmap.Config.ARGB_8888)
    } else {
      Bitmap.createBitmap(drawable.intrinsicWidth, drawable.intrinsicHeight, Bitmap.Config.ARGB_8888)
    }
    
    val canvas = Canvas(bitmap)
    drawable.setBounds(0, 0, canvas.width, canvas.height)
    drawable.draw(canvas)
    return bitmap
  }

  public fun saveBlockedApps(packageNames: List<String>) {
    try {
      val prefs = context.getSharedPreferences("app_blocker_prefs", Context.MODE_PRIVATE)
      prefs.edit().putStringSet("blocked_packages", packageNames.toSet()).apply()
    } catch (e: Exception) {
      Log.e("AppBlockerModule", "Error saving blocked apps", e)
    }
  }

  private fun getBlockedApps(): List<String> {
    try {
      val prefs = context.getSharedPreferences("app_blocker_prefs", Context.MODE_PRIVATE)
      return prefs.getStringSet("blocked_packages", emptySet())?.toList() ?: emptyList()
    } catch (e: Exception) {
      Log.e("AppBlockerModule", "Error getting blocked apps", e)
      return emptyList()
    }
  }

  override fun definition() = ModuleDefinition {
    Name("AppBlockerModule")

    // --- Permission Functions ---
    AsyncFunction("checkPermissions") {
      val usageStatsGranted = hasUsageStatsPermission()
      val overlayGranted = hasOverlayPermission()
      val notificationListenerGranted = hasNotificationListenerPermission()
      val notificationBlockingEnabled = isNotificationBlockingEnabled()
      
      return@AsyncFunction mapOf(
        "granted" to (usageStatsGranted && overlayGranted && (!notificationBlockingEnabled || notificationListenerGranted)),
        "usageStatsGranted" to usageStatsGranted,
        "overlayGranted" to overlayGranted,
        "notificationListenerGranted" to notificationListenerGranted,
        "notificationBlockingEnabled" to notificationBlockingEnabled,
        "prompted" to true
      )
    }
    
    AsyncFunction("requestPermissions") {
      // We need both USAGE_STATS and SYSTEM_ALERT_WINDOW permissions
      if (!hasUsageStatsPermission()) {
        val usageStatsIntent = Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS)
        usageStatsIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        context.startActivity(usageStatsIntent)
        return@AsyncFunction mapOf(
          "granted" to false,
          "prompted" to true,
          "message" to "Please grant usage stats permission"
        )
      }
      
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(context)) {
        val overlayIntent = Intent(
          Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
          Uri.parse("package:${context.packageName}")
        )
        overlayIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        context.startActivity(overlayIntent)
        return@AsyncFunction mapOf(
          "granted" to false,
          "prompted" to true,
          "message" to "Please grant overlay permission"
        )
      }

      if (isNotificationBlockingEnabled() && !hasNotificationListenerPermission()) {
        val notificationListenerIntent = Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS)
        notificationListenerIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        context.startActivity(notificationListenerIntent)
        return@AsyncFunction mapOf(
          "granted" to false,
          "prompted" to true,
          "message" to "Please grant notification listener permission"
        )
      }
      
      // All required permissions are granted
      return@AsyncFunction mapOf(
        "granted" to true,
        "prompted" to true
      )
    }

    AsyncFunction("setNotificationBlockingEnabled") { enabled: Boolean ->
      setNotificationBlockingEnabled(enabled)
      return@AsyncFunction mapOf(
        "success" to true
      )
    }

    // --- App Listing Function ---
    AsyncFunction("getInstalledApps") {
      val packageManager = appContext.reactContext?.packageManager
      val installedApps = mutableListOf<Map<String, Any>>()

      try {
        val packages = packageManager?.getInstalledApplications(PackageManager.GET_META_DATA)
        packages?.forEach { appInfo ->
          if (packageManager.getLaunchIntentForPackage(appInfo.packageName) != null) {
            // Only add apps that can be launched
            val appName = packageManager.getApplicationLabel(appInfo).toString()
            
            // Get the app icon using the ApplicationInfo
            val icon = appInfo.loadIcon(packageManager)
            val iconBitmap = drawableToBitmap(icon)
            
            // Convert bitmap to Base64 string for the URI
            val byteArrayOutputStream = ByteArrayOutputStream()
            iconBitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream)
            val byteArray = byteArrayOutputStream.toByteArray()
            val iconBase64 = Base64.encodeToString(byteArray, Base64.DEFAULT)
            val iconUri = "data:image/png;base64,$iconBase64"
            
            installedApps.add(mapOf(
              "appName" to appName,
              "packageName" to appInfo.packageName,
              "isBlocked" to false,
              "iconUri" to iconUri
            ))
          }
        }
      } catch (e: Exception) {
        Log.e("AppBlockerModule", "Error getting installed apps", e)
      }

      return@AsyncFunction installedApps
    }

    // --- Monitoring Functions ---

    AsyncFunction("startMonitoring") {
      try {
        if (!hasUsageStatsPermission() || !hasOverlayPermission()) {
          return@AsyncFunction mapOf(
            "success" to false,
            "error" to "Missing required permissions"
          )
        }
      
        // Get saved blocked apps
        val blockedPackages = ArrayList(getBlockedApps())
        
        // Get the list of blocked apps from persisted storage
        val serviceIntent = Intent(context, AppBlockerService::class.java)
        serviceIntent.action = "START_MONITORING"
        
        // Add the list of blocked apps
        serviceIntent.putStringArrayListExtra("BLOCKED_PACKAGES", blockedPackages)
        
        // Start the foreground service
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
          context.startForegroundService(serviceIntent)
        } else {
          context.startService(serviceIntent)
        }
        
        return@AsyncFunction mapOf(
          "success" to true
        )
      } catch (e: Exception) {
        return@AsyncFunction mapOf(
          "success" to false,
          "error" to e.message
        )
      }
    }

    AsyncFunction("blockApps") { packageNames: List<String> ->
      try {
        // Save the list for persistence
        saveBlockedApps(packageNames)
        
        // Update the service with the new list
        val serviceIntent = Intent(context, AppBlockerService::class.java)
        
        if (packageNames.isEmpty()) {
          // If no apps to block, stop the service
          serviceIntent.action = "STOP_MONITORING"
          context.stopService(serviceIntent)
        } else {
          // First check if service is running, if not start it
          serviceIntent.action = "UPDATE_BLOCKED_PACKAGES"
          
          // Add the list of blocked packages
          val blockedPackages = ArrayList(packageNames)
          serviceIntent.putStringArrayListExtra("BLOCKED_PACKAGES", blockedPackages)
          
          // Send update to service or start if not running
          if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            context.startForegroundService(serviceIntent)
          } else {
            context.startService(serviceIntent)
          }
        }
        
        return@AsyncFunction mapOf(
          "success" to true
        )
      } catch (e: Exception) {
        return@AsyncFunction mapOf(
          "success" to false,
          "error" to e.message
        )
      }
    }

    AsyncFunction("getBlockingStats") {
      val prefs = context.getSharedPreferences("app_blocker_stats", Context.MODE_PRIVATE)
      val totalBlocks = prefs.getInt("total_blocks", 0)
      val appStats = mutableMapOf<String, Int>()
      
      // Get per-app blocking counts
      val blockedApps = getBlockedApps()
      blockedApps.forEach { packageName ->
        val count = prefs.getInt("blocks_$packageName", 0)
        if (count > 0) {
          val appName = try {
            val appInfo = context.packageManager.getApplicationInfo(packageName, 0)
            context.packageManager.getApplicationLabel(appInfo).toString()
          } catch (e: Exception) {
            packageName
          }
          appStats[appName] = count
        }
      }
      
      return@AsyncFunction mapOf(
        "totalBlocks" to totalBlocks,
        "appStats" to appStats
      )
    }

    AsyncFunction("endFocusSession") {
      try {
        // Stop the monitoring service
        val serviceIntent = Intent(context, AppBlockerService::class.java)
        serviceIntent.action = "STOP_MONITORING"
        context.stopService(serviceIntent)
        
        // Clear blocked apps
        saveBlockedApps(emptyList())
        
        return@AsyncFunction mapOf(
          "success" to true
        )
      } catch (e: Exception) {
        return@AsyncFunction mapOf(
          "success" to false,
          "error" to e.message
        )
      }
    }

    // --- Settings Opening Functions ---
    AsyncFunction("openUsageStatsSettings") {
      try {
        val usageStatsIntent = Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS)
        usageStatsIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        context.startActivity(usageStatsIntent)
        return@AsyncFunction mapOf(
          "success" to true
        )
      } catch (e: Exception) {
        return@AsyncFunction mapOf(
          "success" to false,
          "error" to e.message
        )
      }
    }

    AsyncFunction("openOverlaySettings") {
      try {
        val overlayIntent = Intent(
          Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
          Uri.parse("package:${context.packageName}")
        )
        overlayIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        context.startActivity(overlayIntent)
        return@AsyncFunction mapOf(
          "success" to true
        )
      } catch (e: Exception) {
        return@AsyncFunction mapOf(
          "success" to false,
          "error" to e.message
        )
      }
    }

    AsyncFunction("openNotificationListenerSettings") {
      try {
        val notificationListenerIntent = Intent(Settings.ACTION_NOTIFICATION_LISTENER_SETTINGS)
        notificationListenerIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        context.startActivity(notificationListenerIntent)
        return@AsyncFunction mapOf(
          "success" to true
        )
      } catch (e: Exception) {
        return@AsyncFunction mapOf(
          "success" to false,
          "error" to e.message
        )
      }
    }

    AsyncFunction("getHourlyAppUsage") { hours: Int ->
      try {
        if (!hasUsageStatsPermission()) {
          return@AsyncFunction mapOf(
            "error" to "Usage stats permission not granted"
          )
        }

        val usageStatsManager = context.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
        val calendar = Calendar.getInstance()
        val endTime = System.currentTimeMillis()
        
        // Calculate start time based on hours parameter
        val startTime = endTime - (hours * 60 * 60 * 1000L)
        
        // Get usage events instead of usage stats for more granular data
        val usageEvents = usageStatsManager.queryEvents(startTime, endTime)
        
        // Map to store hourly usage: hour -> app -> time
        val hourlyStats = mutableMapOf<String, MutableMap<String, Long>>()
        val appStartTimes = mutableMapOf<String, Long>()
        
        while (usageEvents.hasNextEvent()) {
          val event = android.app.usage.UsageEvents.Event()
          usageEvents.getNextEvent(event)
          
          when (event.eventType) {
            android.app.usage.UsageEvents.Event.ACTIVITY_RESUMED,
            android.app.usage.UsageEvents.Event.MOVE_TO_FOREGROUND -> {
              // App moved to foreground
              appStartTimes[event.packageName] = event.timeStamp
            }
            
            android.app.usage.UsageEvents.Event.ACTIVITY_PAUSED,
            android.app.usage.UsageEvents.Event.MOVE_TO_BACKGROUND -> {
              // App moved to background
              val startTimeForApp = appStartTimes[event.packageName]
              if (startTimeForApp != null) {
                val duration = event.timeStamp - startTimeForApp
                
                // Get app name
                val appName = try {
                  val appInfo = context.packageManager.getApplicationInfo(event.packageName, 0)
                  context.packageManager.getApplicationLabel(appInfo).toString()
                } catch (e: Exception) {
                  event.packageName
                }
                
                // Calculate hour bucket for the session in UTC
                val utcCalendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"))
                utcCalendar.timeInMillis = startTimeForApp
                utcCalendar.set(Calendar.MINUTE, 0)
                utcCalendar.set(Calendar.SECOND, 0)
                utcCalendar.set(Calendar.MILLISECOND, 0)
                
                // Format as ISO string in UTC
                val sdf = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
                sdf.timeZone = TimeZone.getTimeZone("UTC")
                val hourKey = sdf.format(utcCalendar.time)
                
                // Add to hourly stats
                if (!hourlyStats.containsKey(hourKey)) {
                  hourlyStats[hourKey] = mutableMapOf()
                }
                hourlyStats[hourKey]!![appName] = (hourlyStats[hourKey]!![appName] ?: 0L) + duration
                
                appStartTimes.remove(event.packageName)
              }
            }
          }
        }
        
        // Handle currently active apps (still in foreground)
        for ((packageName, startTimeForApp) in appStartTimes) {
          val duration = endTime - startTimeForApp
          
          // Skip if duration is too short (less than 1 second)
          if (duration < 1000) continue
          
          // Get app name
          val appName = try {
            val appInfo = context.packageManager.getApplicationInfo(packageName, 0)
            context.packageManager.getApplicationLabel(appInfo).toString()
          } catch (e: Exception) {
            packageName
          }
          
          // Calculate hour bucket for the session start in UTC
          val utcCalendar = Calendar.getInstance(TimeZone.getTimeZone("UTC"))
          utcCalendar.timeInMillis = startTimeForApp
          utcCalendar.set(Calendar.MINUTE, 0)
          utcCalendar.set(Calendar.SECOND, 0)
          utcCalendar.set(Calendar.MILLISECOND, 0)
          
          // Format as ISO string in UTC
          val sdf = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
          sdf.timeZone = TimeZone.getTimeZone("UTC")
          val hourKey = sdf.format(utcCalendar.time)
          
          // Add to hourly stats
          if (!hourlyStats.containsKey(hourKey)) {
            hourlyStats[hourKey] = mutableMapOf()
          }
          hourlyStats[hourKey]!![appName] = (hourlyStats[hourKey]!![appName] ?: 0L) + duration
          
          Log.d("AppBlockerModule", "Added active app $appName: ${duration}ms in hour $hourKey")
        }
        
        return@AsyncFunction mapOf(
          "hourlyStats" to hourlyStats
        )
      } catch (e: Exception) {
        Log.e("AppBlockerModule", "Error getting hourly usage", e)
        return@AsyncFunction mapOf(
          "error" to e.message
        )
      }
    }

    AsyncFunction("getHistoricalAppUsage") { days: Int ->
      try {
        val usageStatsManager = context.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
        val calendar = Calendar.getInstance()
        
        // Get the current month and year from the calendar
        val currentMonth = calendar.get(Calendar.MONTH)
        val currentYear = calendar.get(Calendar.YEAR)
        
        // Set to the first day of the current month
        calendar.set(currentYear, currentMonth, 1, 0, 0, 0)
        calendar.set(Calendar.MILLISECOND, 0)
        val startTime = calendar.timeInMillis
        
        // Set to the last day of the current month
        calendar.set(currentYear, currentMonth, calendar.getActualMaximum(Calendar.DAY_OF_MONTH), 23, 59, 59)
        calendar.set(Calendar.MILLISECOND, 999)
        val endTime = calendar.timeInMillis

        Log.d("AppBlockerModule", "Querying usage stats from ${Date(startTime)} to ${Date(endTime)}")

        val usageStats = usageStatsManager.queryUsageStats(
          UsageStatsManager.INTERVAL_DAILY,
          startTime,
          endTime
        )

        val historicalStats = mutableMapOf<String, MutableMap<String, Long>>()
        
        // Initialize the map with dates
        calendar.timeInMillis = startTime
        while (calendar.timeInMillis <= endTime) {
          val dateStr = String.format("%04d-%02d-%02d", 
            calendar.get(Calendar.YEAR),
            calendar.get(Calendar.MONTH) + 1,
            calendar.get(Calendar.DAY_OF_MONTH)
          )
          historicalStats[dateStr] = mutableMapOf()
          calendar.add(Calendar.DAY_OF_MONTH, 1)
        }

        // Fill in the stats for each day
        usageStats?.forEach { stats ->
          val packageName = stats.packageName
          val totalTime = stats.totalTimeInForeground
          if (totalTime > 0) {
            try {
              val appInfo = context.packageManager.getApplicationInfo(packageName, 0)
              val appName = context.packageManager.getApplicationLabel(appInfo).toString()
              
              // Get the date for this stat
              calendar.timeInMillis = stats.lastTimeUsed
              val dateStr = String.format("%04d-%02d-%02d", 
                calendar.get(Calendar.YEAR),
                calendar.get(Calendar.MONTH) + 1,
                calendar.get(Calendar.DAY_OF_MONTH)
              )
              
              // Add the usage time to the appropriate date
              historicalStats[dateStr]?.put(appName, totalTime)
            } catch (e: Exception) {
              // Skip system apps or apps we can't get info for
            }
          }
        }

        return@AsyncFunction mapOf(
          "historicalStats" to historicalStats
        )
      } catch (e: Exception) {
        Log.e("AppBlockerModule", "Error getting historical usage", e)
        return@AsyncFunction mapOf(
          "error" to e.message
        )
      }
    }

  }
} 