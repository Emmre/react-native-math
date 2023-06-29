const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

module.exports = mergeConfig(getDefaultConfig(__dirname), {
  resolver: {
    blacklistRE:
      /.*(node_modules[\/\\]react[\/\\]dist[\/\\].*|website\/node_modules\/.*|heapCapture\/bundle\.js|.*\/__tests__\/.*)$/,
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
});
