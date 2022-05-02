const { errorGenerator } = require("@/functions/utilities/generators");

const APP_ERROR_KEYS = {
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
};

const { INTERNAL_SERVER_ERROR, UNKNOWN_ERROR } = APP_ERROR_KEYS;

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

const appErrors = {
  properties: { NO_ROUTE_OBJECT, NOT_FOUND },

  info: { version: "1.0.0" },
};

module.exports = { appErrors };
