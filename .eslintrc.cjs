/* eslint-disable @typescript-eslint/no-var-requires */
const { defineConfig } = require("eslint-define-config");
const restrictedGlobals = require("eslint-restricted-globals");
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = defineConfig({
  env: {
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@cspell/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:json/recommended",
    "plugin:security/recommended",
    "plugin:sonarjs/recommended",
  ],
  globals: {
    logger: true,
  },
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "@cspell",
    "@typescript-eslint",
    "chai-friendly",
    "import",
    "security",
    "sonarjs",
    "unicorn",
    "unused-imports",
  ],
  rules: {
    "security/detect-object-injection": "off",
    "@cspell/spellchecker": [
      "error",
      {
        autoFix: true,
        checkComments: true,
        ignoreImportProperties: false,
      },
    ],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-redeclare": "error",
    "@typescript-eslint/no-unused-vars": "off",
    "arrow-parens": "warn",
    "chai-friendly/no-unused-expressions": 1,
    "import/no-unresolved": [
      2,
      {
        amd: true,
        commonjs: true,
        esmodule: true,
        ignore: ["type-fest", "teletalk-type-store"],
      },
    ],
    "linebreak-style": ["error", "unix"],
    "no-console": "warn",
    "no-delete-var": "warn",
    "no-process-exit": "off",
    "no-restricted-globals": ["error"].concat(restrictedGlobals),
    "no-undef": "error",
    "no-unused-expressions": 0,
    "no-unused-vars": "off",
    "no-use-before-define": [
      "error",
      {
        allowNamedExports: false,
        classes: true,
        functions: false,
        variables: false,
      },
    ],
    "no-var": "warn",
    "object-shorthand": ["error", "always"],
    quotes: ["warn", "double"],
    semi: ["error", "always"],
    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        args: "after-used",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
        vars: "all",
        varsIgnorePattern: "^_",
      },
    ],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"],
    },
    "import/resolver": {
      "eslint-import-resolver-custom-alias": {
        alias: {
          "@": "./testSrc",
          "~": "./src",
        },
        extensions: [".ts", ".js", ".json"],
      },
      node: true,
    },
  },
});
