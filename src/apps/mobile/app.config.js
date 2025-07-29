module.exports = {
  expo: {
    name: "blockit",
    slug: "blockit",
    version: "1.0.0",
    jsEngine: "hermes",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      bundleIdentifier: "com.ascendmarie.blockit"
    },
    android: {
      edgeToEdgeEnabled: true,
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        // backgroundColor: "#ffffff"
      },
      package: "com.ascendmarie.blockit",
      permissions: [
        "android.permission.PACKAGE_USAGE_STATS"
      ],
      theme: {
        name: "Theme.EdgeToEdge",
        parent: "Theme.AppCompat.Light.NoActionBar"
      }
    },
    web: {
      favicon: "./assets/icon.png"
    },
    plugins: [
      "expo-router",
      "expo-asset",
      "expo-secure-store",
      ["expo-font",
      {
        // "fonts": [
        //   "./assets/fonts/ClashDisplay-Bold.otf",
        //   "./assets/fonts/ClashDisplay-ExtraLight.otf",
        //   "./assets/fonts/ClashDisplay-Light.otf",
        //   "./assets/fonts/ClashDisplay-Medium.otf",
        //   "./assets/fonts/ClashDisplay-Regular.otf",
        //   "./assets/fonts/ClashDisplay-Semibold.otf"
        // ],
        "android": {
          "fonts": [
            {
              "fontFamily": "ClashDisplay",
              "fontDefinitions": [
                {
                  "path": "./assets/fonts/ClashDisplay-ExtraLight.otf",
                  "weight": 200
                },
                {
                  "path": "./assets/fonts/ClashDisplay-Light.otf",
                  "weight": 300
                },
                {
                  "path": "./assets/fonts/ClashDisplay-Regular.otf",
                  "weight": 400,
                },
                {
                  "path": "./assets/fonts/ClashDisplay-Medium.otf",
                  "weight": 500
                },
                {
                  "path": "./assets/fonts/ClashDisplay-Semibold.otf",
                  "weight": 600
                },
                {
                  "path": "./assets/fonts/ClashDisplay-Bold.otf",
                  "weight": 700
                }
              ]
            }
          ]
        },
        "ios": {
          "fonts": [
            "./assets/fonts/ClashDisplay-Bold.otf",
            "./assets/fonts/ClashDisplay-ExtraLight.otf",
            "./assets/fonts/ClashDisplay-Light.otf",
            "./assets/fonts/ClashDisplay-Medium.otf",
            "./assets/fonts/ClashDisplay-Regular.otf",
            "./assets/fonts/ClashDisplay-SemiBold.otf"
          ]
        }
      }]
    ],
    scheme: "blockit",
    extra: {
      projectRoot: "../../"
    }
  }
};