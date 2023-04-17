module.exports = {
  env: {
    es2021: true,
    jest: false,
    mocha: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@cspell/recommended",
    "plugin:json/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:sonarjs/recommended",
    "prettier",
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
  plugins: ["@typescript-eslint", "@cspell", "sonarjs", "unused-imports"],
  rules: {
    "unused-imports/no-unused-imports": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
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

    "@cspell/spellchecker": [
      "warn",
      {
        autoFix: false,
        checkComments: false,
        ignoreImportProperties: false,
        // ignoreImports: false,
      },
    ],
    "arrow-parens": "warn",
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    "no-delete-var": "warn",
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
    // "no-restricted-globals": ["error"].concat(restrictedGlobals),
    // "no-unused-expressions": 0,
  },
};

//   "node/exports-style": ["error", "module.exports"],
//   "node/file-extension-in-import": ["error", "always"],
//   "node/prefer-global/buffer": ["error", "always"],
//   "node/prefer-global/console": ["error", "always"],
//   "node/prefer-global/process": ["error", "always"],
//   "node/prefer-global/url-search-params": ["error", "always"],
//   "node/prefer-global/url": ["error", "always"],
//   "node/prefer-promises/dns": "error",
//   "node/prefer-promises/fs": "error"
