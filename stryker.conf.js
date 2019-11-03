module.exports = function(config) {
  config.set({
    mutate: ["bin/**/*.js", "lib/**/*.js"],
    mutator: "javascript",
    packageManager: "yarn",
    reporters: ["html", "clear-text", "progress"],
    testRunner: "command",
    transpilers: [],
    coverageAnalysis: "all"
  });
};
