import { JestConfigWithTsJest, pathsToModuleNameMapper } from "ts-jest";

import tsconfig from "./tsconfig.json";

let baseOptions: JestConfigWithTsJest = {
  extensionsToTreatAsEsm: [".ts"],
  forceExit: true,
  maxWorkers: 2,
  moduleFileExtensions: ["js", "ts", "json", "node"],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths),
  modulePaths: [tsconfig.compilerOptions.baseUrl],
  setupFiles: ["./jest.setup.ts"],
  testEnvironment: "node",
  testMatch: [
    "**/testSrc/__tests__/e2e/events/auth/createNewUser.spec.ts",
    "**/testSrc/__tests__/e2e/events/auth/logout.spec.ts",
    "**/testSrc/__tests__/e2e/events/auth/signIn.spec.ts",
    "**/testSrc/__tests__/e2e/events/auth/verify.spec.ts",
    "**/testSrc/__tests__/e2e/events/other/getStuff.spec.ts",
    "**/testSrc/__tests__/e2e/events/privateChat/getPrivateChat.spec.ts",
    "**/testSrc/__tests__/e2e/events/privateChat/getPrivateChats.spec.ts",
    "**/testSrc/__tests__/e2e/events/privateChat/sendPrivateMessage.spec.ts",
    "**/testSrc/__tests__/e2e/events/user/addBlock.spec.ts",
    // "**/testSrc/__tests__/e2e/events/user/addContact.spec.ts",
    // "**/testSrc/__tests__/e2e/events/user/editContact.spec.ts",
    "**/testSrc/__tests__/e2e/events/user/getContacts.spec.ts",
    "**/testSrc/__tests__/e2e/events/user/getPublicUserData.spec.ts",
    "**/testSrc/__tests__/e2e/events/user/getUserData.spec.ts",
    "**/testSrc/__tests__/e2e/events/user/removeBlock.spec.ts",
    "**/testSrc/__tests__/e2e/events/user/removeContact.spec.ts",
    "**/testSrc/__tests__/e2e/events/user/updatePublicUserData.spec.ts",
    "**/testSrc/__tests__/e2e/middleware/attachClientStr.spec.ts",
    "**/testSrc/__tests__/e2e/middleware/checkClient.spec.ts",
    "**/testSrc/__tests__/e2e/middleware/checkCurrentClient.spec.ts",
    "**/testSrc/__tests__/e2e/middleware/checkCurrentUser.spec.ts",
    "**/testSrc/__tests__/e2e/middleware/checkDataFields.spec.ts",
    "**/testSrc/__tests__/e2e/middleware/checkEventAvailability.spec.ts",
    "**/testSrc/__tests__/e2e/middleware/validateClientId.spec.ts",
    "**/testSrc/__tests__/e2e/middleware/verifyClient.spec.ts",
  ],
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
        useESM: true,
      },
    ],
  },
  transformIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/lib",
    "<rootDir>/coverage",
  ],
};

const coverageOptions: JestConfigWithTsJest = {
  collectCoverage: true,
  collectCoverageFrom: ["./src/**"],
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
};

if (process.env.COVERAGE) baseOptions = { ...baseOptions, ...coverageOptions };

export default baseOptions;
