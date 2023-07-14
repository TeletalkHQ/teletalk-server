import { JestConfigWithTsJest, pathsToModuleNameMapper } from "ts-jest";

import tsconfig from "./tsconfig.json";

let baseOptions: JestConfigWithTsJest = {
  extensionsToTreatAsEsm: [".ts"],
  forceExit: true,
  logHeapUsage: false,
  maxWorkers: 4,
  moduleFileExtensions: ["js", "ts", "json", "node"],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths),
  modulePaths: [tsconfig.compilerOptions.baseUrl],
  setupFiles: ["./jest.setup.ts"],
  setupFilesAfterEnv: ["./configs/jestConsoleFix.js"],
  silent: false,
  testEnvironment: "node",
  // testMatch: ["**/testSrc/index.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/lib",
    "<rootDir>/coverage",
  ],
  testTimeout: 20000,
  // testRegex: ".*.spec.ts",
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        diagnostics: {
          // exclude: ["**"],
        },
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/lib",
    "<rootDir>/coverage",
  ],
  verbose: true,
};

const coverageOptions: JestConfigWithTsJest = {
  collectCoverage: true,
  collectCoverageFrom: ["./src/**"],
  coverageThreshold: {
    global: {
      lines: 85,
    },
  },
};

if (process.env.COVERAGE) baseOptions = { ...baseOptions, ...coverageOptions };

export default baseOptions;
