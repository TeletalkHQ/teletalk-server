import register from "@babel/register";

register({
  extensions: [".js", ".jsx", ".ts", ".tsx"],
  ignore: [/node_modules/],
});

const config = {
  $schema: "./node_modules/@stryker-mutator/core/schema/stryker-schema.json",
  checkers: ["typescript"],
  coverageAnalysis: "perTest",
  // files: [
  //   // List of files to mutate and test
  // ],
  mochaOptions: {
    "async-only": false,
    config: ".mocharc.json",
    // delay: true,
    // exit: true,
    extension: ["ts"],
    grep: ".*",
    "node-option": [
      "experimental-specifier-resolution=node",
      "loader=./loader.js",
      "trace-warnings",
      "no-warnings",
    ],
    package: "package.json",
    // recursive: true,
    // reporter: "spec",
    // require: ["./loader.js"],
    spec: ["testSrc/**/*.ts"],
    // timeout: 60000,
    ui: "bdd",
    // "watch-files": ["testSrc/**/*.spec.ts"],
  },
  // mutator: "typescript",
  reporters: ["html", "clear-text", "progress"],
  testRunner: "ts-mocha",
  // transpilers: ["typescript"],
  tsconfigFile: "tsconfig.json",
  typescriptChecker: {
    prioritizePerformanceOverAccuracy: true,
  },
};

export default config;
