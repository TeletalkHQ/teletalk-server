const { errorBuilder } = require("@/classes/ErrorBuilder");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utilities");

const { ERROR_KEYS } = require("@/variables/others/errorKeys");
const { UNIQUE_ERROR_IDS } = require("@/variables/others/uniqueErrorIds");

const { INPUT_OUTPUT_FIELDS, INTERNAL_SERVER_ERROR } = ERROR_KEYS;

const NO_ROUTE_OBJECT = errorBuilder
  .create()
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason(UNIQUE_ERROR_IDS.NO_ROUTE_OBJECT)
  .statusCode(500)
  .build();

const OUTPUT_FIELDS_MISSING = errorBuilder
  .create()
  .errorKey(INPUT_OUTPUT_FIELDS)
  .errorReason(UNIQUE_ERROR_IDS.OUTPUT_FIELDS_MISSING)
  .statusCode(500)
  .build();

const OUTPUT_FIELDS_OVERLOAD = errorBuilder
  .create()
  .errorKey(INPUT_OUTPUT_FIELDS)
  .errorReason(UNIQUE_ERROR_IDS.OUTPUT_FIELDS_OVERLOAD)
  .statusCode(500)
  .build();

const REQUEST_BODY_IS_UNDEFINED = errorBuilder
  .create()
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason(UNIQUE_ERROR_IDS.REQUEST_BODY_IS_UNDEFINED)
  .statusCode(500)
  .build();
const REQUIRED_FIELDS_NOT_DEFINED = errorBuilder
  .create()
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason(UNIQUE_ERROR_IDS.REQUIRED_FIELDS_NOT_DEFINED)
  .statusCode(500)
  .build();
const REQUIRED_IO_FIELD_IS_NOT_OBJECT = errorBuilder
  .create()
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason(UNIQUE_ERROR_IDS.REQUIRED_IO_FIELD_IS_NOT_OBJECT)
  .statusCode(500)
  .build();
const REQUIRED_IO_FIELD_IS_NOT_ARRAY = errorBuilder
  .create()
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason(UNIQUE_ERROR_IDS.REQUIRED_IO_FIELD_IS_NOT_ARRAY)
  .statusCode(500)
  .build();

const OUTPUT_FIELD_TYPE_WRONG = errorBuilder
  .create()
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason(UNIQUE_ERROR_IDS.OUTPUT_FIELD_TYPE_WRONG)
  .statusCode(500)
  .build();
const REQUIRED_FIELD_TYPE_WRONG = errorBuilder
  .create()
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason(UNIQUE_ERROR_IDS.REQUIRED_FIELD_TYPE_WRONG)
  .statusCode(500)
  .build();

const SEND_JSON_RESPONSE_IS_NOT_FUNCTION = errorBuilder
  .create()
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason(UNIQUE_ERROR_IDS.SEND_JSON_RESPONSE_IS_NOT_FUNCTION)
  .statusCode(500)
  .build();

const SEND_SMS_FAILED = errorBuilder
  .create()
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason(UNIQUE_ERROR_IDS.SEND_SMS_FAILED)
  .statusCode(500)
  .build();

const UNKNOWN_ERROR = errorBuilder
  .create()
  .errorKey(INTERNAL_SERVER_ERROR)
  .errorReason(UNIQUE_ERROR_IDS.UNKNOWN_ERROR)
  .statusCode(500)
  .build();

const errors = {
  NO_ROUTE_OBJECT,
  OUTPUT_FIELD_TYPE_WRONG,
  OUTPUT_FIELDS_MISSING,
  OUTPUT_FIELDS_OVERLOAD,
  REQUEST_BODY_IS_UNDEFINED,
  REQUIRED_FIELD_TYPE_WRONG,
  REQUIRED_FIELDS_NOT_DEFINED,
  REQUIRED_IO_FIELD_IS_NOT_ARRAY,
  REQUIRED_IO_FIELD_IS_NOT_OBJECT,
  SEND_JSON_RESPONSE_IS_NOT_FUNCTION,
  SEND_SMS_FAILED,
  UNKNOWN_ERROR,
};

const serverErrors = {
  ...errors,
  version: versionCalculator(extractVersions(errors)),
};

module.exports = { serverErrors };
