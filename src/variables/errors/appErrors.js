const { errorBuilder } = require("@/classes/Builders");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utils");

const {
  EXTERNAL_APP_ERROR,
  INPUT_OUTPUT_FIELDS,
  INTERNAL_SERVER_ERROR,
  UNKNOWN_ROUTE,
} = {
  EXTERNAL_APP_ERROR: "EXTERNAL_APP_ERROR",
  INPUT_OUTPUT_FIELDS: "INPUT_OUTPUT_FIELDS",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  UNKNOWN_ROUTE: "UNKNOWN_ROUTE",
};

const NO_ROUTE_OBJECT = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason("NO_ROUTE_OBJECT")
  .message("Internal server error")
  .statusCode(500)
  .version("1.0.0")
  .build();

const ROUTE_NOT_FOUND = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(UNKNOWN_ROUTE)
  .errorReason("ROUTE_NOT_FOUND")
  .message("Route not found")
  .statusCode(404)
  .version("1.0.0")
  .build();

const INPUT_FIELDS_MISSING = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(INPUT_OUTPUT_FIELDS)
  .errorReason("INPUT_FIELDS_MISSING")
  .message("Internal server error")
  .statusCode(400)
  .version("1.0.0")
  .build();

const INPUT_FIELDS_OVERLOAD = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(INPUT_OUTPUT_FIELDS)
  .errorReason("INPUT_FIELDS_OVERLOAD")
  .message("Internal server error")
  .statusCode(400)
  .version("1.0.0")
  .build();

const METHOD_NOT_ALLOWED = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(EXTERNAL_APP_ERROR)
  .errorReason("METHOD_NOT_ALLOWED")
  .message("External app error")
  .statusCode(405)
  .version("1.0.0")
  .build();

const OUTPUT_FIELDS_MISSING = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(INPUT_OUTPUT_FIELDS)
  .errorReason("OUTPUT_FIELDS_MISSING")
  .message("Internal server error")
  .statusCode(500)
  .version("1.0.0")
  .build();

const OUTPUT_FIELDS_OVERLOAD = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(INPUT_OUTPUT_FIELDS)
  .errorReason("OUTPUT_FIELDS_OVERLOAD")
  .message("Internal server error")
  .statusCode(500)
  .version("1.0.0")
  .build();

const REQUEST_BODY_IS_UNDEFINED = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason("REQUEST_BODY_IS_UNDEFINED")
  .message("sendJsonResponse is not a function")
  .statusCode(500)
  .version("1.0.0")
  .build();

const REQUIRED_FIELDS_NOT_DEFINED = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason("REQUIRED_FIELDS_NOT_DEFINED")
  .message(
    "Required fields is not denied, If you want to check io fields you need to provide required fields."
  )
  .statusCode(500)
  .version("1.0.0")
  .build();

const REQUIRED_IO_FIELD_IS_NOT_OBJECT = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason("REQUIRED_IO_FIELD_IS_NOT_OBJECT")
  .message("Required field is not object")
  .statusCode(500)
  .version("1.0.0")
  .build("REQUIRED_IO_FIELD_IS_NOT_OBJECT");

const REQUIRED_IO_FIELD_IS_NOT_ARRAY = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason("REQUIRED_IO_FIELD_IS_NOT_ARRAY")
  .message("Required field is not array")
  .statusCode(500)
  .version("1.0.0")
  .build();

const SEND_JSON_RESPONSE_IS_NOT_FUNCTION = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason("SEND_JSON_RESPONSE_IS_NOT_FUNCTION")
  .message("sendJsonResponse is not a function")
  .statusCode(500)
  .version("1.0.0")
  .build();

const SEND_SMS_FAILED = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason("SEND_SMS_FAILED")
  .message("send sms failed")
  .statusCode(500)
  .version("1.0.0")
  .build();

const UNKNOWN_ERROR = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason("UNKNOWN_ERROR")
  .message("Unknown error occurred, Call your service")
  .statusCode(500)
  .version("1.0.0")
  .build();

const errors = {
  INPUT_FIELDS_MISSING,
  INPUT_FIELDS_OVERLOAD,
  METHOD_NOT_ALLOWED,
  NO_ROUTE_OBJECT,
  OUTPUT_FIELDS_MISSING,
  OUTPUT_FIELDS_OVERLOAD,
  REQUEST_BODY_IS_UNDEFINED,
  REQUIRED_FIELDS_NOT_DEFINED,
  REQUIRED_IO_FIELD_IS_NOT_ARRAY,
  REQUIRED_IO_FIELD_IS_NOT_OBJECT,
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
