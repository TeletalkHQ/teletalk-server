import { pathsToModuleNameMapper, JestConfigWithTsJest } from "ts-jest";

import tsconfig from "./tsconfig.json";

const jestConfig: JestConfigWithTsJest = {
  moduleFileExtensions: ["js", "ts", "json", "node"],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths),
  modulePaths: [tsconfig.compilerOptions.baseUrl],
  preset: "ts-jest",
  roots: ["<rootDir>"],
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.ts?(x)",
    // "./__tests__/tests/integration/**/*.ts?(x)",
    //   "./__tests__/tests/integration/routers/auth/?(*.)+(spec|test).ts",
  ],
};

export default jestConfig;
