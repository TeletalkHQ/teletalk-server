const UNIQUE_ERROR_IDS = {
  BIO_EMPTY: "BIO_EMPTY",
  BIO_INVALID_TYPE: "BIO_INVALID_TYPE",
  BIO_MAXLENGTH_REACH: "BIO_MAXLENGTH_REACH",
  BIO_MINLENGTH_REACH: "BIO_MINLENGTH_REACH",
  BLACKLIST_INVALID_TYPE: "BLACKLIST_INVALID_TYPE",
  BLACKLIST_ITEM_EXIST: "BLACKLIST_ITEM_EXIST",
  BLACKLIST_ITEM_NOT_EXIST: "BLACKLIST_ITEM_NOT_EXIST",
  CELLPHONE_EXIST: "CELLPHONE_EXIST",
  CELLPHONE_EXIST_IN_CONTACT: "CELLPHONE_EXIST_IN_CONTACT",
  CELLPHONE_INVALID: "CELLPHONE_INVALID",
  CELLPHONE_NOT_EXIST: "CELLPHONE_NOT_EXIST",
  CELLPHONE_REQUIRED: "CELLPHONE_REQUIRED",
  CHAT_EXIST: "CHAT_EXIST",
  CHAT_ID_EMPTY: "CHAT_ID_EMPTY",
  CHAT_ID_EXIST: "CHAT_ID_EXIST",
  CHAT_ID_INVALID: "CHAT_ID_INVALID",
  CHAT_ID_INVALID_TYPE: "CHAT_ID_INVALID_TYPE",
  CHAT_ID_MAX_LENGTH_REACH: "CHAT_ID_MAX_LENGTH_REACH",
  CHAT_ID_MIN_LENGTH_REACH: "CHAT_ID_MIN_LENGTH_REACH",
  CHAT_ID_REQUIRED: "CHAT_ID_REQUIRED",
  CHAT_NOT_EXIST: "CHAT_NOT_EXIST",
  CHATS_INVALID_TYPE: "CHATS_INVALID_TYPE",
  CONTACT_INVALID_TYPE: "CONTACT_INVALID_TYPE",
  CONTACT_ITEM_EXIST: "CONTACT_ITEM_EXIST",
  CONTACT_ITEM_NOT_EXIST: "CONTACT_ITEM_NOT_EXIST",
  COUNTRY_CODE_EMPTY: "COUNTRY_CODE_EMPTY",
  COUNTRY_CODE_INVALID: "COUNTRY_CODE_INVALID",
  COUNTRY_CODE_INVALID_TYPE: "COUNTRY_CODE_INVALID_TYPE",
  COUNTRY_CODE_MAXLENGTH_REACH: "COUNTRY_CODE_MAXLENGTH_REACH",
  COUNTRY_CODE_MINLENGTH_REACH: "COUNTRY_CODE_MINLENGTH_REACH",
  COUNTRY_CODE_NOT_SUPPORTED: "COUNTRY_CODE_NOT_SUPPORTED",
  COUNTRY_CODE_NUMERIC: "COUNTRY_CODE_NUMERIC",
  COUNTRY_CODE_REQUIRED: "COUNTRY_CODE_REQUIRED",
  COUNTRY_NAME_EMPTY: "COUNTRY_NAME_EMPTY",
  COUNTRY_NAME_INVALID: "COUNTRY_NAME_INVALID",
  COUNTRY_NAME_INVALID_TYPE: "COUNTRY_NAME_INVALID_TYPE",
  COUNTRY_NAME_MAXLENGTH_REACH: "COUNTRY_NAME_MAXLENGTH_REACH",
  COUNTRY_NAME_MINLENGTH_REACH: "COUNTRY_NAME_MINLENGTH_REACH",
  COUNTRY_NAME_NOT_SUPPORTED: "COUNTRY_NAME_NOT_SUPPORTED",
  COUNTRY_NAME_REQUIRED: "COUNTRY_NAME_REQUIRED",
  COUNTRY_NOT_SUPPORTED: "COUNTRY_NOT_SUPPORTED",
  CREATED_AT_INVALID_TYPE: "CREATED_AT_INVALID_TYPE",
  CREATED_AT_REQUIRED: "CREATED_AT_REQUIRED",
  CURRENT_USER_EXIST: "CURRENT_USER_EXIST",
  CURRENT_USER_NOT_EXIST: "CURRENT_USER_NOT_EXIST",
  FIRST_NAME_EMPTY: "FIRST_NAME_EMPTY",
  FIRST_NAME_INVALID_TYPE: "FIRST_NAME_INVALID_TYPE",
  FIRST_NAME_MAXLENGTH_REACH: "FIRST_NAME_MAXLENGTH_REACH",
  FIRST_NAME_MINLENGTH_REACH: "FIRST_NAME_MINLENGTH_REACH",
  FIRST_NAME_REQUIRED: "FIRST_NAME_REQUIRED",
  FULL_NAME_INVALID: "FULL_NAME_INVALID",
  INPUT_FIELD_TYPE_WRONG: "INPUT_FIELD_TYPE_WRONG",
  INPUT_FIELDS_MISSING: "INPUT_FIELDS_MISSING",
  INPUT_FIELDS_OVERLOAD: "INPUT_FIELDS_OVERLOAD",
  LAST_NAME_EMPTY: "LAST_NAME_EMPTY",
  LAST_NAME_INVALID: "LAST_NAME_INVALID",
  LAST_NAME_INVALID_TYPE: "LAST_NAME_INVALID_TYPE",
  LAST_NAME_MAXLENGTH_REACH: "LAST_NAME_MAXLENGTH_REACH",
  LAST_NAME_MINLENGTH_REACH: "LAST_NAME_MINLENGTH_REACH",
  LAST_NAME_REQUIRED: "LAST_NAME_REQUIRED",
  MAC_ADDRESS_EMPTY: "MAC_ADDRESS_EMPTY",
  MAC_ADDRESS_EXIST: "MAC_ADDRESS_EXIST",
  MAC_ADDRESS_INVALID_TYPE: "MAC_ADDRESS_INVALID_TYPE",
  MAC_ADDRESS_MAXLENGTH_REACH: "MAC_ADDRESS_MAXLENGTH_REACH",
  MAC_ADDRESS_MINLENGTH_REACH: "MAC_ADDRESS_MINLENGTH_REACH",
  MAC_ADDRESS_REQUIRED: "MAC_ADDRESS_REQUIRED",
  MESSAGE_ID_EXIST: "MESSAGE_ID_EXIST",
  MESSAGE_ID_INVALID_TYPE: "MESSAGE_ID_INVALID_TYPE",
  MESSAGE_ID_MAX_LENGTH_REACH: "MESSAGE_ID_MAX_LENGTH_REACH",
  MESSAGE_ID_MIN_LENGTH_REACH: "MESSAGE_ID_MIN_LENGTH_REACH",
  MESSAGE_ID_REQUIRED: "MESSAGE_ID_REQUIRED",
  MESSAGE_TEXT_EMPTY: "MESSAGE_TEXT_EMPTY",
  MESSAGE_TEXT_INVALID: "MESSAGE_TEXT_INVALID",
  MESSAGE_TEXT_INVALID_TYPE: "MESSAGE_TEXT_INVALID_TYPE",
  MESSAGE_TEXT_MAX_LENGTH_REACH: "MESSAGE_TEXT_MAX_LENGTH_REACH",
  MESSAGE_TEXT_MIN_LENGTH_REACH: "MESSAGE_TEXT_MIN_LENGTH_REACH",
  MESSAGE_TEXT_REQUIRED: "MESSAGE_TEXT_REQUIRED",
  METHOD_NOT_ALLOWED: "METHOD_NOT_ALLOWED",
  NO_ROUTE_OBJECT: "NO_ROUTE_OBJECT",
  OUTPUT_FIELD_TYPE_WRONG: "OUTPUT_FIELD_TYPE_WRONG",
  OUTPUT_FIELDS_MISSING: "OUTPUT_FIELDS_MISSING",
  OUTPUT_FIELDS_OVERLOAD: "OUTPUT_FIELDS_OVERLOAD",
  PARTICIPANT_EMPTY: "PARTICIPANT_EMPTY",
  PARTICIPANT_ID_EXIST: "PARTICIPANT_ID_EXIST",
  PARTICIPANT_ID_INVALID: "PARTICIPANT_ID_INVALID",
  PARTICIPANT_ID_INVALID_TYPE: "PARTICIPANT_ID_INVALID_TYPE",
  PARTICIPANT_ID_MAX_LENGTH_REACH: "PARTICIPANT_ID_MAX_LENGTH_REACH",
  PARTICIPANT_ID_MIN_LENGTH_REACH: "PARTICIPANT_ID_MIN_LENGTH_REACH",
  PARTICIPANT_ID_REQUIRED: "PARTICIPANT_ID_REQUIRED",
  PARTICIPANT_NOT_EXIST: "PARTICIPANT_NOT_EXIST",
  PHONE_NUMBER_EMPTY: "PHONE_NUMBER_EMPTY",
  PHONE_NUMBER_EXIST: "PHONE_NUMBER_EXIST",
  PHONE_NUMBER_INVALID: "PHONE_NUMBER_INVALID",
  PHONE_NUMBER_INVALID_TYPE: "PHONE_NUMBER_INVALID_TYPE",
  PHONE_NUMBER_MAXLENGTH_REACH: "PHONE_NUMBER_MAXLENGTH_REACH",
  PHONE_NUMBER_MINLENGTH_REACH: "PHONE_NUMBER_MINLENGTH_REACH",
  PHONE_NUMBER_NUMERIC: "PHONE_NUMBER_NUMERIC",
  PHONE_NUMBER_REQUIRED: "PHONE_NUMBER_REQUIRED",
  REQUEST_BODY_IS_UNDEFINED: "REQUEST_BODY_IS_UNDEFINED",
  REQUIRED_FIELD_TYPE_WRONG: "REQUIRED_FIELD_TYPE_WRONG",
  REQUIRED_FIELDS_NOT_DEFINED: "REQUIRED_FIELDS_NOT_DEFINED",
  REQUIRED_IO_FIELD_IS_NOT_ARRAY: "REQUIRED_IO_FIELD_IS_NOT_ARRAY",
  REQUIRED_IO_FIELD_IS_NOT_OBJECT: "REQUIRED_IO_FIELD_IS_NOT_OBJECT",
  ROUTE_NOT_FOUND: "ROUTE_NOT_FOUND",
  SELF_STUFF: "SELF_STUFF",
  SEND_JSON_RESPONSE_IS_NOT_FUNCTION: "SEND_JSON_RESPONSE_IS_NOT_FUNCTION",
  SEND_SMS_FAILED: "SEND_SMS_FAILED",
  SENDER_EMPTY: "SENDER_EMPTY",
  SENDER_ID_EXIST: "SENDER_ID_EXIST",
  SENDER_ID_INVALID_TYPE: "SENDER_ID_INVALID_TYPE",
  SENDER_ID_MAX_LENGTH_REACH: "SENDER_ID_MAX_LENGTH_REACH",
  SENDER_ID_MIN_LENGTH_REACH: "SENDER_ID_MIN_LENGTH_REACH",
  SENDER_ID_REQUIRED: "SENDER_ID_REQUIRED",
  TARGET_USER_NOT_EXIST: "TARGET_USER_NOT_EXIST",
  TEMPORARY_CLIENT_NOT_FOUND: "TEMPORARY_CLIENT_NOT_FOUND",
  TOKEN_CAN_NOT_VERIFIED: "TOKEN_CAN_NOT_VERIFIED",
  TOKEN_EXIST: "TOKEN_EXIST",
  TOKEN_INVALID: "TOKEN_INVALID",
  TOKEN_INVALID_TYPE: "TOKEN_INVALID_TYPE",
  TOKEN_MAXLENGTH_REACH: "TOKEN_MAXLENGTH_REACH",
  TOKEN_MINLENGTH_REACH: "TOKEN_MINLENGTH_REACH",
  TOKEN_REQUIRED: "TOKEN_REQUIRED",
  UNKNOWN_ERROR: "UNKNOWN_ERROR",
  USER_EXIST: "USER_EXIST",
  USER_ID_EMPTY: "USER_ID_EMPTY",
  USER_ID_EXIST: "USER_ID_EXIST",
  USER_ID_INVALID: "USER_ID_INVALID",
  USER_ID_INVALID_TYPE: "USER_ID_INVALID_TYPE",
  USER_ID_MAX_LENGTH_REACH: "USER_ID_MAX_LENGTH_REACH",
  USER_ID_MIN_LENGTH_REACH: "USER_ID_MIN_LENGTH_REACH",
  USER_ID_REQUIRED: "USER_ID_REQUIRED",
  USER_NO_LONGER_PARTICIPANT: "USER_NO_LONGER_PARTICIPANT",
  USERNAME_EMPTY: "USERNAME_EMPTY",
  USERNAME_EXIST: "USERNAME_EXIST",
  USERNAME_INVALID: "USERNAME_INVALID",
  USERNAME_INVALID_TYPE: "USERNAME_INVALID_TYPE",
  USERNAME_MAXLENGTH_REACH: "USERNAME_MAXLENGTH_REACH",
  USERNAME_MINLENGTH_REACH: "USERNAME_MINLENGTH_REACH",
  USERNAME_REQUIRED: "USERNAME_REQUIRED",
  VERIFICATION_CODE_EMPTY: "VERIFICATION_CODE_EMPTY",
  VERIFICATION_CODE_INVALID: "VERIFICATION_CODE_INVALID",
  VERIFICATION_CODE_INVALID_LENGTH: "VERIFICATION_CODE_INVALID_LENGTH",
  VERIFICATION_CODE_INVALID_TYPE: "VERIFICATION_CODE_INVALID_TYPE",
  VERIFICATION_CODE_MAXLENGTH_REACH: "VERIFICATION_CODE_MAXLENGTH_REACH",
  VERIFICATION_CODE_NUMERIC: "VERIFICATION_CODE_NUMERIC",
  VERIFICATION_CODE_REQUIRED: "VERIFICATION_CODE_REQUIRED",
};

module.exports = { UNIQUE_ERROR_IDS };
