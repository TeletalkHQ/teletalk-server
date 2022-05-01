const { errorGenerator } = require("~/functions/utilities/generators");

const APP_ERROR_KEYS = {
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
};

const { INTERNAL_SERVER_ERROR } = APP_ERROR_KEYS;

const NO_ROUTE_OBJECT = errorGenerator(
  5000,
  500,
  "Internal server error",
  "NO_ROUTE_OBJECT",
  "1.0.0",
  INTERNAL_SERVER_ERROR
);

const appErrors = { NO_ROUTE_OBJECT };

module.exports = { appErrors };
