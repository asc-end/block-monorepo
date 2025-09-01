const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

// Find the project root directory
const projectRoot = __dirname;
const workspaceRoot = path.resolve(__dirname, "../..");

const config = getDefaultConfig(projectRoot);

// Add .riv and .mp3 to assetExts
config.resolver.assetExts.push('riv', 'mp3');

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
config.resolver.unstable_enablePackageExports = true;

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
  'crypto': require.resolve('expo-crypto'),
  'stream': require.resolve('readable-stream'),
  'buffer': require.resolve('buffer/'),
  'react-dom': require.resolve('react-native'),
};

// Export the config with NativeWind
module.exports = withNativeWind(config, {
  input: "./src/global.css",
  configPath: "./tailwind.config.js",
});
