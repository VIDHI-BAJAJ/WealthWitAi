module.exports = {
  module: {
    rules: [
      {
        test: /\.json$/,
        type: "json", // Enable ESM-style JSON imports
      },
    ],
  },
  resolve: {
    fallback: {
      url: require.resolve("url/"), // Polyfill the 'url' module
    },
  },
};
