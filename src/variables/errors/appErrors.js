const { errorGenerator } = require("@/functions/utilities/generators");
const {
  versionCalculator,
  extractVersions,
} = require("@/functions/utilities/utils");

const APP_ERROR_KEYS = {
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  INPUT_OUTPUT_FIELDS: "INPUT_OUTPUT_FIELDS",
};

const { INPUT_OUTPUT_FIELDS, INTERNAL_SERVER_ERROR, UNKNOWN_ERROR } =
  APP_ERROR_KEYS;

const NO_ROUTE_OBJECT = errorGenerator(
  5000,
  500,
  "Internal server error",
  "NO_ROUTE_OBJECT",
  "1.0.0",
  INTERNAL_SERVER_ERROR
);

const NOT_FOUND = errorGenerator(
  5000,
  404,
  "Internal server error",
  "NOT_FOUND",
  "1.0.0",
  UNKNOWN_ERROR
);

const INPUT_FIELDS_MISSING = errorGenerator(
  5000,
  400,
  "Internal server error",
  "INPUT_FIELDS_MISSING",
  "1.0.0",
  INPUT_OUTPUT_FIELDS
);

const INPUT_FIELDS_OVERLOAD = errorGenerator(
  5000,
  400,
  "Internal server error",
  "INPUT_FIELDS_OVERLOAD",
  "1.0.0",
  INPUT_OUTPUT_FIELDS
);

const OUTPUT_FIELDS_MISSING = errorGenerator(
  5000,
  500,
  "Internal server error",
  "OUTPUT_FIELDS_MISSING",
  "1.0.0",
  INPUT_OUTPUT_FIELDS
);

const OUTPUT_FIELDS_OVERLOAD = errorGenerator(
  5000,
  500,
  "Internal server error",
  "OUTPUT_FIELDS_OVERLOAD",
  "1.0.0",
  INPUT_OUTPUT_FIELDS
);

const SEND_JSON_RESPONSE_IS_NOT_FUNCTION = errorGenerator(
  5000,
  500,
  "sendJsonResponse is not a function",
  "INTERNAL_SERVER_ERROR",
  "1.0.0",
  INTERNAL_SERVER_ERROR
);

const errors = {
  INPUT_FIELDS_MISSING,
  INPUT_FIELDS_OVERLOAD,
  NO_ROUTE_OBJECT,
  NOT_FOUND,
  OUTPUT_FIELDS_MISSING,
  OUTPUT_FIELDS_OVERLOAD,
  SEND_JSON_RESPONSE_IS_NOT_FUNCTION,
};

const appErrors = {
  ...errors,
  version: versionCalculator(extractVersions(errors)),
};

module.exports = { appErrors };
