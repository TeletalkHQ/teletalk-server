const { errorBuilder } = require("@/classes/Builders");

const {
  versionCalculator,
  extractVersions,
} = require("@/functions/utilities/utils");

const {
  INPUT_OUTPUT_FIELDS,
  INTERNAL_SERVER_ERROR,
  UNKNOWN_ROUTE,
  EXTERNAL_APP_ERROR,
} = {
  INPUT_OUTPUT_FIELDS: "INPUT_OUTPUT_FIELDS",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  EXTERNAL_APP_ERROR: "EXTERNAL_APP_ERROR",
  UNKNOWN_ROUTE: "UNKNOWN_ROUTE",
};

const NO_ROUTE_OBJECT = errorBuilder
  .create()
  .errorCode(5000)
  .statusCode(500)
  .message("Internal server error")
  .errorReason("NO_ROUTE_OBJECT")
  .version("1.0.0")
  .errorKey(INTERNAL_SERVER_ERROR)
  .build();

const ROUTE_NOT_FOUND = errorBuilder
  .create()
  .errorCode(5000)
  .statusCode(404)
  .message("Route not found")
  .errorReason("ROUTE_NOT_FOUND")
  .version("1.0.0")
  .errorKey(UNKNOWN_ROUTE)
  .build();

const INPUT_FIELDS_MISSING = errorBuilder
  .create()
  .errorCode(5000)
  .statusCode(400)
  .message("Internal server error")
  .errorReason("INPUT_FIELDS_MISSING")
  .version("1.0.0")
  .errorKey(INPUT_OUTPUT_FIELDS)
  .build();

const INPUT_FIELDS_OVERLOAD = errorBuilder
  .create()
  .errorCode(5000)
  .statusCode(400)
  .message("Internal server error")
  .errorReason("INPUT_FIELDS_OVERLOAD")
  .version("1.0.0")
  .errorKey(INPUT_OUTPUT_FIELDS)
  .build();

const METHOD_NOT_ALLOWED = errorBuilder
  .create()
  .errorCode(5000)
  .statusCode(405)
  .message("External app error")
  .errorReason("METHOD_NOT_ALLOWED")
  .version("1.0.0")
  .errorKey(EXTERNAL_APP_ERROR)
  .build();

const OUTPUT_FIELDS_MISSING = errorBuilder
  .create()
  .errorCode(5000)
  .statusCode(500)
  .message("Internal server error")
  .errorReason("OUTPUT_FIELDS_MISSING")
  .version("1.0.0")
  .errorKey(INPUT_OUTPUT_FIELDS)
  .build();

const OUTPUT_FIELDS_OVERLOAD = errorBuilder
  .create()
  .errorCode(5000)
  .statusCode(500)
  .message("Internal server error")
  .errorReason("OUTPUT_FIELDS_OVERLOAD")
  .version("1.0.0")
  .errorKey(INPUT_OUTPUT_FIELDS)
  .build();

const REQUEST_BODY_IS_UNDEFINED = errorBuilder
  .create()
  .errorCode(5000)
  .statusCode(500)
  .message("sendJsonResponse is not a function")
  .errorReason("REQUEST_BODY_IS_UNDEFINED")
  .version("1.0.0")
  .errorKey(INTERNAL_SERVER_ERROR)
  .build();

const SEND_JSON_RESPONSE_IS_NOT_FUNCTION = errorBuilder
  .create()
  .errorCode(5000)
  .statusCode(500)
  .message("sendJsonResponse is not a function")
  .errorReason("SEND_JSON_RESPONSE_IS_NOT_FUNCTION")
  .version("1.0.0")
  .errorKey(INTERNAL_SERVER_ERROR)
  .build();

const SEND_SMS_FAILED = errorBuilder
  .create()
  .errorCode(5000)
  .statusCode(500)
  .message("send sms failed")
  .errorReason("SEND_SMS_FAILED")
  .version("1.0.0")
  .errorKey(INTERNAL_SERVER_ERROR)
  .build();

const UNKNOWN_ERROR = errorBuilder
  .create()
  .errorCode(5000)
  .statusCode(500)
  .message("Unknown error occurred, Call your service")
  .errorReason("UNKNOWN_ERROR")
  .version("1.0.0")
  .errorKey(INTERNAL_SERVER_ERROR)
  .build();

const errors = {
  INPUT_FIELDS_MISSING,
  INPUT_FIELDS_OVERLOAD,
  METHOD_NOT_ALLOWED,
  NO_ROUTE_OBJECT,
  OUTPUT_FIELDS_MISSING,
  OUTPUT_FIELDS_OVERLOAD,
  REQUEST_BODY_IS_UNDEFINED,
  ROUTE_NOT_FOUND,
  SEND_JSON_RESPONSE_IS_NOT_FUNCTION,
  SEND_SMS_FAILED,
  UNKNOWN_ERROR,
};

const appErrors = {
  ...errors,
  version: versionCalculator(extractVersions(errors)),
};

module.exports = { appErrors };
