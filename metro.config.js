const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");
const os = require("os");

const config = getDefaultConfig(__dirname);

// Add pnpm cache to watchFolders to fix Metro bundler issues with pnpm
const pnpmCachePath = path.join(os.homedir(), ".pnpm-store", "v3");
const pnpmCachePathAlt = path.join(
  os.homedir(),
  "AppData",
  "Local",
  "pnpm-cache"
);

const watchFolders = [__dirname];
if (require("fs").existsSync(pnpmCachePath)) {
  watchFolders.push(pnpmCachePath);
}
if (require("fs").existsSync(pnpmCachePathAlt)) {
  watchFolders.push(pnpmCachePathAlt);
}

config.watchFolders = watchFolders;

module.exports = withNativeWind(config, { input: "./app/global.css" });
