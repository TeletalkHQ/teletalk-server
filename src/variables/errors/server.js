const { errorBuilder } = require("@/classes/ErrorBuilder");

const { ERROR_KEYS } = require("@/variables/others/errorKeys");
const { UNIQUE_ERROR_IDS } = require("@/variables/others/uniqueErrorIds");

const { INPUT_OUTPUT_FIELDS, INTERNAL_SERVER_ERROR } = ERROR_KEYS;

const OUTPUT_FIELDS_MISSING = errorBuilder
  .create()
  .errorKey(INPUT_OUTPUT_FIELDS)
  .reason(UNIQUE_ERROR_IDS.OUTPUT_FIELDS_MISSING)
  .statusCode(500)
  .build();

const OUTPUT_FIELDS_OVERLOAD = errorBuilder
  .create()
  .errorKey(INPUT_OUTPUT_FIELDS)
  .reason(UNIQUE_ERROR_IDS.OUTPUT_FIELDS_OVERLOAD)
  .statusCode(500)
  .build();

const REQUEST_BODY_IS_UNDEFINED = errorBuilder
  .create()
  .errorKey(INTERNAL_SERVER_ERROR)
  .reason(UNIQUE_ERROR_IDS.REQUEST_BODY_IS_UNDEFINED)
  .statusCode(500)
  .build();
const REQUIRED_FIELDS_NOT_DEFINED = errorBuilder
  .create()
  .errorKey(INTERNAL_SERVER_ERROR)
  .reason(UNIQUE_ERROR_IDS.REQUIRED_FIELDS_NOT_DEFINED)
  .statusCode(500)
  .build();
const REQUIRED_IO_FIELD_IS_NOT_OBJECT = errorBuilder
  .create()
  .errorKey(INTERNAL_SERVER_ERROR)
  .reason(UNIQUE_ERROR_IDS.REQUIRED_IO_FIELD_IS_NOT_OBJECT)
  .statusCode(500)
  .build();
const REQUIRED_IO_FIELD_IS_NOT_ARRAY = errorBuilder
  .create()
  .errorKey(INTERNAL_SERVER_ERROR)
  .reason(UNIQUE_ERROR_IDS.REQUIRED_IO_FIELD_IS_NOT_ARRAY)
  .statusCode(500)
  .build();

const OUTPUT_FIELD_TYPE_WRONG = errorBuilder
  .create()
  .errorKey(INTERNAL_SERVER_ERROR)
  .reason(UNIQUE_ERROR_IDS.OUTPUT_FIELD_TYPE_WRONG)
  .statusCode(500)
  .build();
const REQUIRED_FIELD_INVALID_TYPE = errorBuilder
  .create()
  .errorKey(INTERNAL_SERVER_ERROR)
  .reason(UNIQUE_ERROR_IDS.REQUIRED_FIELD_INVALID_TYPE)
  .statusCode(500)
  .build();

const SEND_JSON_RESPONSE_IS_NOT_FUNCTION = errorBuilder
  .create()
  .errorKey(INTERNAL_SERVER_ERROR)
  .reason(UNIQUE_ERROR_IDS.SEND_JSON_RESPONSE_IS_NOT_FUNCTION)
  .statusCode(500)
  .build();

const SEND_SMS_FAILED = errorBuilder
  .create()
  .errorKey(INTERNAL_SERVER_ERROR)
  .reason(UNIQUE_ERROR_IDS.SEND_SMS_FAILED)
  .statusCode(500)
  .build();

const SERVER_CRITICAL_ERROR = errorBuilder
  .create()
  .errorKey(INTERNAL_SERVER_ERROR)
  .reason(UNIQUE_ERROR_IDS.SERVER_CRITICAL_ERROR)
  .statusCode(500)
  .build();

const UNKNOWN_ERROR = errorBuilder
  .create()
  .errorKey(INTERNAL_SERVER_ERROR)
  .reason(UNIQUE_ERROR_IDS.UNKNOWN_ERROR)
  .statusCode(500)
  .build();

const serverErrors = {
  OUTPUT_FIELD_TYPE_WRONG,
  OUTPUT_FIELDS_MISSING,
  OUTPUT_FIELDS_OVERLOAD,
  REQUEST_BODY_IS_UNDEFINED,
  REQUIRED_FIELD_INVALID_TYPE,
  REQUIRED_FIELDS_NOT_DEFINED,
  REQUIRED_IO_FIELD_IS_NOT_ARRAY,
  REQUIRED_IO_FIELD_IS_NOT_OBJECT,
  SEND_JSON_RESPONSE_IS_NOT_FUNCTION,
  SEND_SMS_FAILED,
  SERVER_CRITICAL_ERROR,
  UNKNOWN_ERROR,
};

module.exports = { serverErrors };
