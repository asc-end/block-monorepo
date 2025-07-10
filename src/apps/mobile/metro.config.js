const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path"); // Import the path module

// Find the project root directory
const projectRoot = __dirname;
const workspaceRoot = path.resolve(__dirname, "../..");

const config = getDefaultConfig(projectRoot);

// Add monorepo support
config.watchFolders = [
  workspaceRoot,
  path.resolve(workspaceRoot, "packages/ui"),
  path.resolve(workspaceRoot, "packages/cross-ui-toolkit")
];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"), 
  path.resolve(workspaceRoot, "node_modules")
];

config.resolver.unstable_enableSymlinks = true;
config.resolver.unstable_enablePackageExports = true; // Important for newer packages


const resolveRequestWithPackageExports = (context, moduleName, platform) => {
  // Package exports in `isows` are incorrect, so we need to disable them
  if (moduleName === "isows") {
    const ctx = {
      ...context,
      unstable_enablePackageExports: false,
    };
    return ctx.resolveRequest(ctx, moduleName, platform);
  }
  // Package exports in `zustand@4` are incorrect, so we need to disable them
  if (moduleName.startsWith("zustand")) {
    const ctx = {
      ...context,
      unstable_enablePackageExports: false,
    };
    return ctx.resolveRequest(ctx, moduleName, platform);
  }
  // Package exports in `jose` are incorrect, so we need to force the browser version
  if (moduleName === "jose") {
    const ctx = {
      ...context,
      unstable_conditionNames: ["browser"],
    };
    return ctx.resolveRequest(ctx, moduleName, platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

config.resolver.resolveRequest = resolveRequestWithPackageExports;

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'crypto': require.resolve('expo-crypto'), // <--- THIS IS KEY FOR JOSE
  'stream': require.resolve('readable-stream'), // Often needed with crypto stuff
  'buffer': require.resolve('buffer/'), // Ensure buffer is correctly polyfilled
  'react-dom': require.resolve('react-native'), // Alias react-dom to react-native
  // If other Node.js modules are requested by jose or its dependencies, add them here
  // e.g., 'util': require.resolve('util/'),
  // 'assert': require.resolve('assert/'),
  // 'fs': require.resolve('react-native-level-fs'), // If you ever get fs errors
};

// Export the config with NativeWind
module.exports = withNativeWind(config, {
  input: "./src/global.css",
  configPath: "./tailwind.config.js",
});
