import { errorBuilder } from "@/classes/ErrorBuilder";

import { ERROR_KEYS } from "@/variables/errors/keys";

const serverErrors = {
  OUTPUT_FIELD_INVALID_TYPE: errorBuilder
    .create()
    .key(ERROR_KEYS.INTERNAL_SERVER_ERROR)
    .reason("OUTPUT_FIELD_INVALID_TYPE")
    .side("server")
    .build(),
  OUTPUT_FIELD_TYPE_WRONG: errorBuilder
    .create()
    .key(ERROR_KEYS.INTERNAL_SERVER_ERROR)
    .reason("OUTPUT_FIELD_TYPE_WRONG")
    .side("server")
    .build(),
  OUTPUT_FIELDS_MISSING: errorBuilder
    .create()
    .key(ERROR_KEYS.INPUT_OUTPUT_FIELDS)
    .reason("OUTPUT_FIELDS_MISSING")
    .side("server")
    .build(),
  OUTPUT_FIELDS_OVERLOAD: errorBuilder
    .create()
    .key(ERROR_KEYS.INPUT_OUTPUT_FIELDS)
    .reason("OUTPUT_FIELDS_OVERLOAD")
    .side("server")
    .build(),
  REQUEST_BODY_IS_UNDEFINED: errorBuilder
    .create()
    .key(ERROR_KEYS.INTERNAL_SERVER_ERROR)
    .reason("REQUEST_BODY_IS_UNDEFINED")
    .side("server")
    .build(),
  REQUIRED_FIELD_INVALID: errorBuilder
    .create()
    .key(ERROR_KEYS.INTERNAL_SERVER_ERROR)
    .reason("REQUIRED_FIELD_INVALID")
    .side("server")
    .build(),
  REQUIRED_FIELD_INVALID_TYPE: errorBuilder
    .create()
    .key(ERROR_KEYS.INTERNAL_SERVER_ERROR)
    .reason("REQUIRED_FIELD_INVALID_TYPE")
    .side("server")
    .build(),
  REQUIRED_FIELDS_NOT_DEFINED: errorBuilder
    .create()
    .key(ERROR_KEYS.INTERNAL_SERVER_ERROR)
    .reason("REQUIRED_FIELDS_NOT_DEFINED")
    .side("server")
    .build(),
  REQUIRED_IO_FIELD_IS_NOT_ARRAY: errorBuilder
    .create()
    .key(ERROR_KEYS.INTERNAL_SERVER_ERROR)
    .reason("REQUIRED_IO_FIELD_IS_NOT_ARRAY")
    .side("server")
    .build(),
  REQUIRED_IO_FIELD_IS_NOT_OBJECT: errorBuilder
    .create()
    .key(ERROR_KEYS.INTERNAL_SERVER_ERROR)
    .reason("REQUIRED_IO_FIELD_IS_NOT_OBJECT")
    .side("server")
    .build(),
  SEND_JSON_RESPONSE_IS_NOT_FUNCTION: errorBuilder
    .create()
    .key(ERROR_KEYS.INTERNAL_SERVER_ERROR)
    .reason("SEND_JSON_RESPONSE_IS_NOT_FUNCTION")
    .side("server")
    .build(),
  SEND_SMS_FAILED: errorBuilder
    .create()
    .key(ERROR_KEYS.INTERNAL_SERVER_ERROR)
    .reason("SEND_SMS_FAILED")
    .side("server")
    .build(),
  SERVER_CRITICAL_ERROR: errorBuilder
    .create()
    .key(ERROR_KEYS.INTERNAL_SERVER_ERROR)
    .reason("SERVER_CRITICAL_ERROR")
    .side("server")
    .build(),
  UNKNOWN_ERROR: errorBuilder
    .create()
    .key(ERROR_KEYS.INTERNAL_SERVER_ERROR)
    .reason("UNKNOWN_ERROR")
    .side("server")
    .build(),
};

export { serverErrors };
