import { pathsToModuleNameMapper, JestConfigWithTsJest } from "ts-jest";

import tsconfig from "./tsconfig.dev.json";

const jestConfig: JestConfigWithTsJest = {
  detectOpenHandles: true,
  // globals: {
  //   "ts-jest": {
  //     tsconfig: "tsconfig.dev.json",
  //   },
  // },
  moduleFileExtensions: ["js", "ts", "json", "node"],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths),
  modulePaths: [tsconfig.compilerOptions.baseUrl],
  preset: "ts-jest",
  roots: ["<rootDir>"],
  setupFiles: [
    "./src/configs/customGlobals.ts",
    "./src/helpers/requireDotenv.ts",
  ],
  testEnvironment: "node",
  testMatch: [
    // "**/__tests__/**/*.ts?(x)",
    // "**/__tests__/tests/integration/routers/auth/createNewUser.spec.ts",
    // "**/__tests__/tests/integration/routers/auth/logout.spec.ts",
    "**/__tests__/tests/integration/routers/auth/signIn.spec.ts",
  ],
  testTimeout: 20000,
};

export default jestConfig;
