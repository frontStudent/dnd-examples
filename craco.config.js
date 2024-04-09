/* craco.config.js */
const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "@Common": path.resolve(__dirname, "src/Examples/Common"),
    },
  },
};
