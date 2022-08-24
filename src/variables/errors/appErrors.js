const { errorBuilder } = require("@/classes/Builders");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utils");

const { errorUniqueIds } = require("@/variables/errors/errorUniqueIds");
const { errorKeys } = require("@/variables/errors/errorKeys");

const {
  EXTERNAL_APP_ERROR,
  INPUT_OUTPUT_FIELDS,
  INTERNAL_SERVER_ERROR,
  UNKNOWN_ROUTE,
} = errorKeys;

const NO_ROUTE_OBJECT = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason(errorUniqueIds.NO_ROUTE_OBJECT)
  .statusCode(500)
  .version("1.0.0")
  .build();

const ROUTE_NOT_FOUND = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(UNKNOWN_ROUTE)
  .errorReason(errorUniqueIds.ROUTE_NOT_FOUND)
  .statusCode(404)
  .version("1.0.0")
  .build();

const INPUT_FIELDS_MISSING = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(INPUT_OUTPUT_FIELDS)
  .errorReason(errorUniqueIds.INPUT_FIELDS_MISSING)
  .statusCode(400)
  .version("1.0.0")
  .build();

const INPUT_FIELDS_OVERLOAD = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(INPUT_OUTPUT_FIELDS)
  .errorReason(errorUniqueIds.INPUT_FIELDS_OVERLOAD)
  .statusCode(400)
  .version("1.0.0")
  .build();

const METHOD_NOT_ALLOWED = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(EXTERNAL_APP_ERROR)
  .errorReason(errorUniqueIds.METHOD_NOT_ALLOWED)
  .statusCode(405)
  .version("1.0.0")
  .build();

const OUTPUT_FIELDS_MISSING = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(INPUT_OUTPUT_FIELDS)
  .errorReason(errorUniqueIds.OUTPUT_FIELDS_MISSING)
  .statusCode(500)
  .version("1.0.0")
  .build();

const OUTPUT_FIELDS_OVERLOAD = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(INPUT_OUTPUT_FIELDS)
  .errorReason(errorUniqueIds.OUTPUT_FIELDS_OVERLOAD)
  .statusCode(500)
  .version("1.0.0")
  .build();

const REQUEST_BODY_IS_UNDEFINED = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason(errorUniqueIds.REQUEST_BODY_IS_UNDEFINED)
  .statusCode(500)
  .version("1.0.0")
  .build();

const REQUIRED_FIELDS_NOT_DEFINED = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason(errorUniqueIds.REQUIRED_FIELDS_NOT_DEFINED)
  .statusCode(500)
  .version("1.0.0")
  .build();

const REQUIRED_IO_FIELD_IS_NOT_OBJECT = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason(errorUniqueIds.REQUIRED_IO_FIELD_IS_NOT_OBJECT)
  .statusCode(500)
  .version("1.0.0")
  .build("REQUIRED_IO_FIELD_IS_NOT_OBJECT");

const REQUIRED_IO_FIELD_IS_NOT_ARRAY = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason(errorUniqueIds.REQUIRED_IO_FIELD_IS_NOT_ARRAY)
  .statusCode(500)
  .version("1.0.0")
  .build();

const SEND_JSON_RESPONSE_IS_NOT_FUNCTION = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason(errorUniqueIds.SEND_JSON_RESPONSE_IS_NOT_FUNCTION)
  .statusCode(500)
  .version("1.0.0")
  .build();

const SEND_SMS_FAILED = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason(errorUniqueIds.SEND_SMS_FAILED)
  .statusCode(500)
  .version("1.0.0")
  .build();

const UNKNOWN_ERROR = errorBuilder
  .create()
  .errorCode(5000)
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason(errorUniqueIds.UNKNOWN_ERROR)
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
