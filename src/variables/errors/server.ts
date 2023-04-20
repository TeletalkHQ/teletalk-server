import { errorBuilder } from "@/classes/ErrorBuilder";

import { ERROR_KEYS } from "@/variables/errors/errorKeys";

const { INPUT_OUTPUT_FIELDS, INTERNAL_SERVER_ERROR } = ERROR_KEYS;

const OUTPUT_FIELDS_MISSING = errorBuilder
  .create()
  .key(INPUT_OUTPUT_FIELDS)
  .reason("OUTPUT_FIELDS_MISSING")
  .side("server")
  .build();

const OUTPUT_FIELDS_OVERLOAD = errorBuilder
  .create()
  .key(INPUT_OUTPUT_FIELDS)
  .reason("OUTPUT_FIELDS_OVERLOAD")
  .side("server")
  .build();

const REQUEST_BODY_IS_UNDEFINED = errorBuilder
  .create()
  .key(INTERNAL_SERVER_ERROR)
  .reason("REQUEST_BODY_IS_UNDEFINED")
  .side("server")
  .build();
const REQUIRED_FIELDS_NOT_DEFINED = errorBuilder
  .create()
  .key(INTERNAL_SERVER_ERROR)
  .reason("REQUIRED_FIELDS_NOT_DEFINED")
  .side("server")
  .build();
const REQUIRED_IO_FIELD_IS_NOT_OBJECT = errorBuilder
  .create()
  .key(INTERNAL_SERVER_ERROR)
  .reason("REQUIRED_IO_FIELD_IS_NOT_OBJECT")
  .side("server")
  .build();
const REQUIRED_IO_FIELD_IS_NOT_ARRAY = errorBuilder
  .create()
  .key(INTERNAL_SERVER_ERROR)
  .reason("REQUIRED_IO_FIELD_IS_NOT_ARRAY")
  .side("server")
  .build();

const OUTPUT_FIELD_TYPE_WRONG = errorBuilder
  .create()
  .key(INTERNAL_SERVER_ERROR)
  .reason("OUTPUT_FIELD_TYPE_WRONG")
  .side("server")
  .build();

const OUTPUT_FIELD_INVALID_TYPE = errorBuilder
  .create()
  .key(INTERNAL_SERVER_ERROR)
  .reason("OUTPUT_FIELD_INVALID_TYPE")
  .side("server")
  .build();

const REQUIRED_FIELD_INVALID = errorBuilder
  .create()
  .key(INTERNAL_SERVER_ERROR)
  .reason("REQUIRED_FIELD_INVALID")
  .side("server")
  .build();

const REQUIRED_FIELD_INVALID_TYPE = errorBuilder
  .create()
  .key(INTERNAL_SERVER_ERROR)
  .reason("REQUIRED_FIELD_INVALID_TYPE")
  .side("server")
  .build();

const SEND_JSON_RESPONSE_IS_NOT_FUNCTION = errorBuilder
  .create()
  .key(INTERNAL_SERVER_ERROR)
  .reason("SEND_JSON_RESPONSE_IS_NOT_FUNCTION")
  .side("server")
  .build();

const SEND_SMS_FAILED = errorBuilder
  .create()
  .key(INTERNAL_SERVER_ERROR)
  .reason("SEND_SMS_FAILED")
  .side("server")
  .build();

const SERVER_CRITICAL_ERROR = errorBuilder
  .create()
  .key(INTERNAL_SERVER_ERROR)
  .reason("SERVER_CRITICAL_ERROR")
  .side("server")
  .build();

const UNKNOWN_ERROR = errorBuilder
  .create()
  .key(INTERNAL_SERVER_ERROR)
  .reason("UNKNOWN_ERROR")
  .side("server")
  .build();

const serverErrors = {
  OUTPUT_FIELD_INVALID_TYPE,
  OUTPUT_FIELD_TYPE_WRONG,
  OUTPUT_FIELDS_MISSING,
  OUTPUT_FIELDS_OVERLOAD,
  REQUEST_BODY_IS_UNDEFINED,
  REQUIRED_FIELD_INVALID,
  REQUIRED_FIELD_INVALID_TYPE,
  REQUIRED_FIELDS_NOT_DEFINED,
  REQUIRED_IO_FIELD_IS_NOT_ARRAY,
  REQUIRED_IO_FIELD_IS_NOT_OBJECT,
  SEND_JSON_RESPONSE_IS_NOT_FUNCTION,
  SEND_SMS_FAILED,
  SERVER_CRITICAL_ERROR,
  UNKNOWN_ERROR,
};

export { serverErrors };
