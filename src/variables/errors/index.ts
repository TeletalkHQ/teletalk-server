import { errorBuilder } from "@/classes/ErrorBuilder";
import { modelErrorBuilder } from "@/classes/ModelErrorBuilder";

const CUSTOM_ERRORS = {
  BLACKLIST_ITEM_EXIST: errorBuilder().reason("BLACKLIST_ITEM_EXIST").build(),
  BLACKLIST_ITEM_NOT_EXIST: errorBuilder()
    .reason("BLACKLIST_ITEM_NOT_EXIST")
    .build(),
  CLIENT_NOT_FOUND: errorBuilder().reason("CLIENT_NOT_FOUND").build(),
  CLIENT_NOT_VERIFIED: errorBuilder().reason("CLIENT_NOT_VERIFIED").build(),
  CONTACT_ITEM_EXIST: errorBuilder().reason("CONTACT_ITEM_EXIST").build(),
  CONTACT_ITEM_NOT_EXIST: errorBuilder()
    .reason("CONTACT_ITEM_NOT_EXIST")
    .build(),
  COUNTRY_CODE_NOT_SUPPORTED: errorBuilder()
    .reason("COUNTRY_CODE_NOT_SUPPORTED")
    .build(),
  COUNTRY_NAME_NOT_SUPPORTED: errorBuilder()
    .reason("COUNTRY_NAME_NOT_SUPPORTED")
    .build(),
  CURRENT_SESSION_NOT_EXIST: errorBuilder()
    .reason("CURRENT_SESSION_NOT_EXIST")
    .build(),
  CURRENT_USER_EXIST: errorBuilder().reason("CURRENT_USER_EXIST").build(),
  CURRENT_USER_NOT_EXIST: errorBuilder()
    .reason("CURRENT_USER_NOT_EXIST")
    .build(),
  EVENT_NOT_FOUND: errorBuilder().reason("EVENT_NOT_FOUND").build(),
  INPUT_DATA_NOT_DEFINED: errorBuilder()
    .reason("INPUT_DATA_NOT_DEFINED")
    .build(),
  INPUT_FIELD_INVALID_TYPE: errorBuilder()
    .reason("INPUT_FIELD_INVALID_TYPE")
    .build(),
  INPUT_FIELDS_MISSING: errorBuilder().reason("INPUT_FIELDS_MISSING").build(),
  INPUT_FIELDS_OVERLOAD: errorBuilder().reason("INPUT_FIELDS_OVERLOAD").build(),
  IS_NOT_A_CALLBACK: errorBuilder().reason("IS_NOT_A_CALLBACK").build(),
  OUTPUT_DATA_NOT_DEFINED: errorBuilder()
    .reason("OUTPUT_DATA_NOT_DEFINED")
    .build(),
  OUTPUT_FIELD_INVALID_TYPE: errorBuilder()
    .reason("OUTPUT_FIELD_INVALID_TYPE")
    .side("server")
    .build(),
  OUTPUT_FIELD_TYPE_WRONG: errorBuilder()
    .reason("OUTPUT_FIELD_TYPE_WRONG")
    .side("server")
    .build(),
  OUTPUT_FIELDS_MISSING: errorBuilder()
    .reason("OUTPUT_FIELDS_MISSING")
    .side("server")
    .build(),
  OUTPUT_FIELDS_OVERLOAD: errorBuilder()
    .reason("OUTPUT_FIELDS_OVERLOAD")
    .side("server")
    .build(),
  REQUIRED_FIELD_INVALID: errorBuilder()
    .reason("REQUIRED_FIELD_INVALID")
    .side("server")
    .build(),
  REQUIRED_FIELD_INVALID_TYPE: errorBuilder()
    .reason("REQUIRED_FIELD_INVALID_TYPE")
    .side("server")
    .build(),
  REQUIRED_FIELDS_NOT_DEFINED: errorBuilder()
    .reason("REQUIRED_FIELDS_NOT_DEFINED")
    .side("server")
    .build(),
  REQUIRED_IO_FIELD_IS_NOT_ARRAY: errorBuilder()
    .reason("REQUIRED_IO_FIELD_IS_NOT_ARRAY")
    .side("server")
    .build(),
  REQUIRED_IO_FIELD_IS_NOT_OBJECT: errorBuilder()
    .reason("REQUIRED_IO_FIELD_IS_NOT_OBJECT")
    .side("server")
    .build(),
  ROUTE_NOT_FOUND: errorBuilder().reason("ROUTE_NOT_FOUND").build(),
  SELF_STUFF: errorBuilder().reason("SELF_STUFF").build(),
  SEND_JSON_RESPONSE_IS_NOT_FUNCTION: errorBuilder()
    .reason("SEND_JSON_RESPONSE_IS_NOT_FUNCTION")
    .side("server")
    .build(),
  SEND_SMS_FAILED: errorBuilder()
    .reason("SEND_SMS_FAILED")
    .side("server")
    .build(),
  SENDER_EMPTY: errorBuilder().reason("SENDER_EMPTY").build(),
  SERVER_CRITICAL_ERROR: errorBuilder()
    .reason("SERVER_CRITICAL_ERROR")
    .side("server")
    .build(),
  SESSION_CAN_NOT_VERIFIED: errorBuilder()
    .reason("SESSION_CAN_NOT_VERIFIED")
    .build(),
  TARGET_USER_NOT_EXIST: errorBuilder().reason("TARGET_USER_NOT_EXIST").build(),
  UNKNOWN_ERROR: errorBuilder().reason("UNKNOWN_ERROR").side("server").build(),
  USER_EXIST: errorBuilder().reason("USER_EXIST").build(),
  USER_NO_LONGER_PARTICIPANT: errorBuilder()
    .reason("USER_NO_LONGER_PARTICIPANT")
    .build(),
};

const MODEL_ERRORS = modelErrorBuilder().build();

const ERRORS = {
  ...CUSTOM_ERRORS,
  ...MODEL_ERRORS,
};

const REQUIRED_FIELD_ERRORS = {
  SCHEMA_INVALID: ERRORS.REQUIRED_FIELD_INVALID,
  SCHEMA_INVALID_TYPE: ERRORS.REQUIRED_FIELD_INVALID_TYPE,
  SCHEMA_NOT_DEFINED: ERRORS.REQUIRED_FIELDS_NOT_DEFINED,
};

const CHECK_FIELD_ERRORS = {
  INPUT: {
    ...REQUIRED_FIELD_ERRORS,
    DATA_FIELD_INVALID_TYPE: ERRORS.INPUT_FIELD_INVALID_TYPE,
    DATA_FIELDS_MISSING: ERRORS.INPUT_FIELDS_MISSING,
    DATA_FIELDS_OVERLOAD: ERRORS.INPUT_FIELDS_OVERLOAD,
    DATA_NOT_DEFINED: ERRORS.INPUT_DATA_NOT_DEFINED,
  },
  OUTPUT: {
    ...REQUIRED_FIELD_ERRORS,
    DATA_FIELD_INVALID_TYPE: ERRORS.OUTPUT_FIELD_INVALID_TYPE,
    DATA_FIELDS_MISSING: ERRORS.OUTPUT_FIELDS_MISSING,
    DATA_FIELDS_OVERLOAD: ERRORS.OUTPUT_FIELDS_OVERLOAD,
    DATA_NOT_DEFINED: ERRORS.OUTPUT_DATA_NOT_DEFINED,
  },
};

const LOCAL_ERRORS = {
  EVENT_IS_INVALID: {
    reason: "EVENT_IS_INVALID",
  },
  ROUTE_IS_INVALID: {
    reason: "ROUTE_IS_INVALID",
  },
  VALIDATION_MODEL_IS_NOT_OBJECT: {
    message: "You must pass validationModel as a object",
    reason: "VALIDATION_MODEL_IS_NOT_OBJECT",
  },
};

console.log(MODEL_ERRORS);

export {
  CHECK_FIELD_ERRORS,
  CUSTOM_ERRORS,
  ERRORS,
  LOCAL_ERRORS,
  MODEL_ERRORS,
};
