"use strict";

const EmberApp = require("ember-cli/lib/broccoli/ember-app");

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    postcssOptions: {
      compile: {
        plugins: [
          require("tailwindcss"),
          { module: require("postcss-import") },
        ],
      },
    },
  });

  return app.toTree();
};
