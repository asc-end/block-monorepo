package expo.modules.appblocker

import android.app.*
import android.content.Context
import android.content.Intent
import android.graphics.PixelFormat
import android.os.Build
import android.os.IBinder
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.WindowManager
import android.app.usage.UsageEvents
import android.app.usage.UsageStatsManager
import android.widget.Button
import android.content.pm.PackageManager
import android.content.pm.ServiceInfo
import android.os.Handler
import android.os.Looper
import android.util.Log
import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit
import android.widget.TextView
import android.service.notification.NotificationListenerService
import android.service.notification.StatusBarNotification
import android.widget.ImageView

class AppBlockerService : Service() {
    private val windowManager by lazy { getSystemService(Context.WINDOW_SERVICE) as WindowManager }
    private val usageStatsManager by lazy { getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager }
    private val appPackageManager by lazy { applicationContext.packageManager }
    private val executor = Executors.newSingleThreadScheduledExecutor()
    private val mainHandler = Handler(Looper.getMainLooper())
    
    private var blockedPackages = mutableSetOf<String>()
    private var overlayView: View? = null
    private var isOverlayShowing = false
    private var currentBlockedApp = ""
    private var lastCheckedTime = System.currentTimeMillis()

    companion object {
        private const val NOTIFICATION_ID = 1
        private const val CHANNEL_ID = "app_blocker_channel"
        private const val CHECK_INTERVAL_MS = 500L // Check more frequently (every 500ms)
        private const val INITIAL_CHECK_INTERVAL_MS = 100L // Even faster for first few checks
        private const val TAG = "AppBlockerService"
    }

    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
        
        // For Android 14 (API 34), specify the foreground service type
        if (Build.VERSION.SDK_INT >= 34) {
            startForeground(NOTIFICATION_ID, createNotification(), ServiceInfo.FOREGROUND_SERVICE_TYPE_DATA_SYNC)
        } else {
            startForeground(NOTIFICATION_ID, createNotification())
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        when (intent?.action) {
            "START_MONITORING" -> {
                val packages = intent.getStringArrayListExtra("BLOCKED_PACKAGES")
                if (packages != null) {
                    blockedPackages = packages.toMutableSet()
                    startMonitoring()
                }
            }
            "STOP_MONITORING" -> {
                stopSelf()
            }
            "UPDATE_BLOCKED_PACKAGES" -> {
                val packages = intent.getStringArrayListExtra("BLOCKED_PACKAGES")
                if (packages != null) {
                    blockedPackages = packages.toMutableSet()
                }
            }
        }
        return START_STICKY
    }

    override fun onBind(intent: Intent?): IBinder? = null

    override fun onDestroy() {
        super.onDestroy()
        executor.shutdownNow()
        hideOverlay()
    }

    private fun startMonitoring() {
        executor.scheduleWithFixedDelay({
            checkUsageEvents()
        }, 0, 100, TimeUnit.MILLISECONDS)
    }

    private fun checkUsageEvents() {
        try {
            val currentTime = System.currentTimeMillis()
            // Use INTERVAL_BEST for more immediate event detection
            val usageEvents = usageStatsManager.queryEvents(
                lastCheckedTime,
                currentTime
            )
            lastCheckedTime = currentTime - 100 // Overlap slightly to not miss events

            val event = UsageEvents.Event()
            while (usageEvents.hasNextEvent()) {
                usageEvents.getNextEvent(event)
                if (event.eventType == UsageEvents.Event.MOVE_TO_FOREGROUND) {
                    val packageName = event.packageName
                    
                    // Ignore system UI, our own app, and launcher/home screen apps
                    if (packageName != "com.android.systemui" && 
                        packageName != this.packageName &&
                        !isLauncherApp(packageName) &&
                        blockedPackages.contains(packageName)) {
                        
                        mainHandler.post {
                            if (!isOverlayShowing || currentBlockedApp != packageName) {
                                currentBlockedApp = packageName
                                showOverlay(packageName)
                            }
                        }
                        // We found a blocked app, no need to check more events
                        break
                    }
                }
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error checking usage events", e)
        }
    }


    private fun isLauncherApp(packageName: String): Boolean {
        try {
            val intent = Intent(Intent.ACTION_MAIN)
            intent.addCategory(Intent.CATEGORY_HOME)
            val resolveInfo = appPackageManager.resolveActivity(intent, 0)
            return resolveInfo?.activityInfo?.packageName == packageName
        } catch (e: Exception) {
            Log.e(TAG, "Error checking if app is launcher", e)
            return false
        }
    }

    private fun showOverlay(packageName: String) {
        if (overlayView != null) {
            hideOverlay()
        }

        try {
            val appName = try {
                val appInfo = appPackageManager.getApplicationInfo(packageName, 0)
                appPackageManager.getApplicationLabel(appInfo).toString()
            } catch (e: PackageManager.NameNotFoundException) {
                packageName
            }

            // Inflate the overlay layout
            val inflater = getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
            overlayView = inflater.inflate(R.layout.app_blocker_overlay, null)
            
            // Add pulsing animation to the dot
            val pulsingDot = overlayView?.findViewById<View>(R.id.pulsingDot)
            pulsingDot?.let {
                val pulseAnimation = android.view.animation.AnimationUtils.loadAnimation(
                    this, R.anim.pulse
                )
                it.startAnimation(pulseAnimation)
            }

            // Set up home button
            overlayView?.findViewById<Button>(R.id.dismissButton)?.setOnClickListener {
                // First hide the overlay
                hideOverlay()
                
                // Then go to home screen
                val homeIntent = Intent(Intent.ACTION_MAIN)
                homeIntent.addCategory(Intent.CATEGORY_HOME)
                homeIntent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
                startActivity(homeIntent)
            }

            // Set up app redirect button
            overlayView?.findViewById<Button>(R.id.openAppButton)?.setOnClickListener {
                // First hide the overlay
                hideOverlay()
                
                // Launch our app (BlockIt), not the blocked app
                val ourAppIntent = appPackageManager.getLaunchIntentForPackage(this.packageName)
                if (ourAppIntent != null) {
                    ourAppIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
                    startActivity(ourAppIntent)
                }
            }

            // Configure layout parameters for the overlay
            val params = WindowManager.LayoutParams(
                WindowManager.LayoutParams.MATCH_PARENT,
                WindowManager.LayoutParams.MATCH_PARENT,
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) 
                    WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY 
                else 
                    WindowManager.LayoutParams.TYPE_SYSTEM_ALERT,
                WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
                        WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL or
                        WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN,
                PixelFormat.TRANSLUCENT
            )
            params.gravity = Gravity.CENTER

            // Add the view to the window
            windowManager.addView(overlayView, params)
            isOverlayShowing = true

            // Animate the overlay
            overlayView?.alpha = 0f
            overlayView?.animate()
                ?.alpha(1f)
                ?.setDuration(300)
                ?.start()
            
            // Track this blocked attempt
            trackBlockedAttempt(packageName)
        } catch (e: Exception) {
            Log.e(TAG, "Error showing overlay", e)
        }
    }

    private fun hideOverlay() {
        if (overlayView != null) {
            try {
                windowManager.removeView(overlayView)
                overlayView = null
                isOverlayShowing = false
                currentBlockedApp = ""
            } catch (e: Exception) {
                Log.e(TAG, "Error hiding overlay", e)
            }
        }
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "App Blocker Service",
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = "Running in background to monitor and block apps"
            }
            val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.createNotificationChannel(channel)
        }
    }

    private fun createNotification(): Notification {
        val notificationIntent = appPackageManager.getLaunchIntentForPackage(packageName)
        val pendingIntent = PendingIntent.getActivity(
            this,
            0,
            notificationIntent,
            PendingIntent.FLAG_IMMUTABLE
        )

        val builder = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Notification.Builder(this, CHANNEL_ID)
        } else {
            @Suppress("DEPRECATION")
            Notification.Builder(this)
        }

        return builder
            .setContentTitle("App Blocker Active")
            .setContentText("Monitoring for blocked apps")
            .setSmallIcon(android.R.drawable.ic_lock_lock)
            .setContentIntent(pendingIntent)
            .build()
    }

    private fun trackBlockedAttempt(packageName: String) {
        try {
            val prefs = applicationContext.getSharedPreferences("app_blocker_stats", Context.MODE_PRIVATE)
            val editor = prefs.edit()
            
            // Increment total blocks
            val totalBlocks = prefs.getInt("total_blocks", 0)
            editor.putInt("total_blocks", totalBlocks + 1)
            
            // Increment per-app blocks
            val appBlocks = prefs.getInt("blocks_$packageName", 0)
            editor.putInt("blocks_$packageName", appBlocks + 1)
            
            editor.apply()
        } catch (e: Exception) {
            Log.e(TAG, "Error tracking block attempt", e)
        }
    }

    private fun saveBlockedApps(apps: List<String>) {
        try {
            val prefs = applicationContext.getSharedPreferences("app_blocker_prefs", Context.MODE_PRIVATE)
            val editor = prefs.edit()
            editor.putStringSet("blocked_packages", apps.toSet())
            editor.apply()
        } catch (e: Exception) {
            Log.e(TAG, "Error saving blocked apps list", e)
        }
    }
}

class NotificationListener : NotificationListenerService() {
    override fun onNotificationPosted(sbn: StatusBarNotification) {
        val blockedPackages = getBlockedPackages()
        if (blockedPackages.contains(sbn.packageName)) {
            // Only cancel the notification without reading its contents
            cancelNotification(sbn.key)
        }
    }

    private fun getBlockedPackages(): Set<String> {
        val prefs = applicationContext.getSharedPreferences("app_blocker_prefs", Context.MODE_PRIVATE)
        return prefs.getStringSet("blocked_packages", emptySet()) ?: emptySet()
    }
} 