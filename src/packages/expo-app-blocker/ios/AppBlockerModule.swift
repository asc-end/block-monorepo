import ExpoModulesCore

public class AppBlockerModule: Module {
  // Define the module
  public func definition() -> ModuleDefinition {
    // This name MUST match the name used in requireNativeModule()
    Name("AppBlockerModule")

    // Implement the methods
    AsyncFunction("checkPermissions") { () -> [String: Any] in
      return [
        "granted": false,
        "prompted": false
      ]
    }

    AsyncFunction("requestPermissions") { () -> [String: Any] in
      return [
        "granted": false,
        "prompted": true
      ]
    }

    AsyncFunction("getInstalledApps") { () -> [[String: Any]] in
      // iOS doesn't allow listing other installed apps
      // Return empty array or mock data for testing
      return []
    }

    AsyncFunction("startMonitoring") { () -> [String: Any] in
      return [
        "success": true
      ]
    }

    AsyncFunction("blockApps") { (packageNames: [String]) -> [String: Any] in
      // iOS doesn't allow blocking other apps
      // Return success for API compatibility
      return [
        "success": true
      ]
    }

    AsyncFunction("endFocusSession") { () -> [String: Any] in
      // iOS doesn't allow blocking other apps
      // Return success for API compatibility
      return [
        "success": true
      ]
    }

    // Settings opening functions - iOS versions
    AsyncFunction("openUsageStatsSettings") { () -> [String: Any] in
      // iOS doesn't have usage stats settings like Android
      // Return success for API compatibility but don't actually open anything
      return [
        "success": true
      ]
    }

    AsyncFunction("openOverlaySettings") { () -> [String: Any] in
      // iOS doesn't have overlay permission settings like Android
      // Return success for API compatibility but don't actually open anything
      return [
        "success": true
      ]
    }

    AsyncFunction("openNotificationListenerSettings") { () -> [String: Any] in
      // iOS doesn't have notification listener settings like Android
      // Return success for API compatibility but don't actually open anything
      return [
        "success": true
      ]
    }
  }
} 