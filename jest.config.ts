import { JestConfigWithTsJest, pathsToModuleNameMapper } from "ts-jest";

import tsconfig from "./tsconfig.json";

let baseOptions: JestConfigWithTsJest = {
  forceExit: true,
  testEnvironment: "node",
  moduleFileExtensions: ["js", "ts", "json", "node"],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths),
  modulePaths: [tsconfig.compilerOptions.baseUrl],
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "tsconfig.json",
      },
    ],
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/lib", "lib"],
  testMatch: [
    // "**/__tests__/**/*.ts?(x)",
    // "**/__tests__/tests/integration/routers/auth/createNewUser.spec.ts",
    // "**/__tests__/tests/integration/routers/auth/logout.spec.ts",
    "**/testSrc/__tests__/e2e/events/auth/signIn.spec.ts",
  ],
  setupFiles: ["./jest.setup.ts"],
};

const coverageOptions: JestConfigWithTsJest = {
  collectCoverage: true,
  collectCoverageFrom: ["./src/**"],
};

if (process.env.COVERAGE) baseOptions = { ...baseOptions, ...coverageOptions };

export default baseOptions;
