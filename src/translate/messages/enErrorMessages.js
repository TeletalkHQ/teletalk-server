const {
  errorUniqueIds: {
    BIO_EMPTY,
    BIO_INVALID_TYPE,
    BIO_MAXLENGTH_REACH,
    BIO_MINLENGTH_REACH,
    BLACKLIST_INVALID_TYPE,
    BLACKLIST_ITEM_EXIST,
    BLACKLIST_ITEM_NOT_EXIST,
    CELLPHONE_EXIST,
    CELLPHONE_EXIST_IN_CONTACT,
    CELLPHONE_INVALID,
    CELLPHONE_NOT_EXIST,
    CELLPHONE_REQUIRED,
    CHAT_EXIST,
    CHAT_ID_EMPTY,
    CHAT_ID_EXIST,
    CHAT_ID_INVALID,
    CHAT_ID_INVALID_TYPE,
    CHAT_ID_MAX_LENGTH_REACH,
    CHAT_ID_MIN_LENGTH_REACH,
    CHAT_ID_REQUIRED,
    CHAT_NOT_EXIST,
    CHATS_INVALID_TYPE,
    CONTACT_INVALID_TYPE,
    CONTACT_ITEM_EXIST,
    CONTACT_ITEM_NOT_EXIST,
    COUNTRY_CODE_EMPTY,
    COUNTRY_CODE_INVALID,
    COUNTRY_CODE_INVALID_TYPE,
    COUNTRY_CODE_MAXLENGTH_REACH,
    COUNTRY_CODE_MINLENGTH_REACH,
    COUNTRY_CODE_NOT_SUPPORTED,
    COUNTRY_CODE_NUMERIC,
    COUNTRY_CODE_REQUIRED,
    COUNTRY_NAME_EMPTY,
    COUNTRY_NAME_INVALID,
    COUNTRY_NAME_INVALID_TYPE,
    COUNTRY_NAME_MAXLENGTH_REACH,
    COUNTRY_NAME_MINLENGTH_REACH,
    COUNTRY_NAME_NOT_SUPPORTED,
    COUNTRY_NAME_REQUIRED,
    COUNTRY_NOT_SUPPORTED,
    CREATED_AT_INVALID_TYPE,
    CREATED_AT_REQUIRED,
    FIRST_NAME_EMPTY,
    FIRST_NAME_INVALID_TYPE,
    FIRST_NAME_MAXLENGTH_REACH,
    FIRST_NAME_MINLENGTH_REACH,
    FIRST_NAME_REQUIRED,
    FULL_NAME_INVALID,
    INPUT_FIELDS_MISSING,
    INPUT_FIELDS_OVERLOAD,
    LAST_NAME_EMPTY,
    LAST_NAME_INVALID,
    LAST_NAME_INVALID_TYPE,
    LAST_NAME_MAXLENGTH_REACH,
    LAST_NAME_MINLENGTH_REACH,
    LAST_NAME_REQUIRED,
    MAC_ADDRESS_EMPTY,
    MAC_ADDRESS_EXIST,
    MAC_ADDRESS_INVALID_TYPE,
    MAC_ADDRESS_MAXLENGTH_REACH,
    MAC_ADDRESS_MINLENGTH_REACH,
    MAC_ADDRESS_REQUIRED,
    MESSAGE_ID_EXIST,
    MESSAGE_ID_INVALID_TYPE,
    MESSAGE_ID_MAX_LENGTH_REACH,
    MESSAGE_ID_MIN_LENGTH_REACH,
    MESSAGE_ID_REQUIRED,
    MESSAGE_TEXT_EMPTY,
    MESSAGE_TEXT_INVALID,
    MESSAGE_TEXT_INVALID_TYPE,
    MESSAGE_TEXT_MAX_LENGTH_REACH,
    MESSAGE_TEXT_MIN_LENGTH_REACH,
    MESSAGE_TEXT_REQUIRED,
    METHOD_NOT_ALLOWED,
    NO_ROUTE_OBJECT,
    OUTPUT_FIELDS_MISSING,
    OUTPUT_FIELDS_OVERLOAD,
    PARTICIPANT_EMPTY,
    PARTICIPANT_ID_EXIST,
    PARTICIPANT_ID_INVALID,
    PARTICIPANT_ID_INVALID_TYPE,
    PARTICIPANT_ID_MAX_LENGTH_REACH,
    PARTICIPANT_ID_MIN_LENGTH_REACH,
    PARTICIPANT_ID_REQUIRED,
    PARTICIPANT_NOT_EXIST,
    PHONE_NUMBER_EMPTY,
    PHONE_NUMBER_EXIST,
    PHONE_NUMBER_INVALID,
    PHONE_NUMBER_INVALID_TYPE,
    PHONE_NUMBER_MAXLENGTH_REACH,
    PHONE_NUMBER_MINLENGTH_REACH,
    PHONE_NUMBER_NUMERIC,
    PHONE_NUMBER_REQUIRED,
    PRIVATE_ID_EMPTY,
    PRIVATE_ID_EXIST,
    PRIVATE_ID_INVALID,
    PRIVATE_ID_INVALID_TYPE,
    PRIVATE_ID_MAX_LENGTH_REACH,
    PRIVATE_ID_MIN_LENGTH_REACH,
    PRIVATE_ID_REQUIRED,
    REQUEST_BODY_IS_UNDEFINED,
    REQUIRED_FIELDS_NOT_DEFINED,
    REQUIRED_IO_FIELD_IS_NOT_ARRAY,
    REQUIRED_IO_FIELD_IS_NOT_OBJECT,
    ROUTE_NOT_FOUND,
    SELF_STUFF,
    SEND_JSON_RESPONSE_IS_NOT_FUNCTION,
    SEND_SMS_FAILED,
    SENDER_EMPTY,
    SENDER_ID_EXIST,
    SENDER_ID_INVALID_TYPE,
    SENDER_ID_MAX_LENGTH_REACH,
    SENDER_ID_MIN_LENGTH_REACH,
    SENDER_ID_REQUIRED,
    TARGET_USER_NOT_EXIST,
    TOKEN_CAN_NOT_VERIFIED,
    TOKEN_EXIST,
    TOKEN_INVALID,
    TOKEN_INVALID_TYPE,
    TOKEN_REQUIRED,
    UNKNOWN_ERROR,
    USER_EXIST,
    USER_NO_LONGER_PARTICIPANT,
    USER_NOT_EXIST,
    USERNAME_EMPTY,
    USERNAME_EXIST,
    USERNAME_INVALID,
    USERNAME_INVALID_TYPE,
    USERNAME_MAXLENGTH_REACH,
    USERNAME_MINLENGTH_REACH,
    USERNAME_REQUIRED,
    VERIFICATION_CODE_EMPTY,
    VERIFICATION_CODE_INVALID,
    VERIFICATION_CODE_INVALID_LENGTH,
    VERIFICATION_CODE_INVALID_TYPE,
    VERIFICATION_CODE_MAXLENGTH_REACH,
    VERIFICATION_CODE_NUMERIC,
    VERIFICATION_CODE_REQUIRED,
  },
} = require("@/variables/errors/errorUniqueIds");

const enErrorMessages = {
  [BIO_EMPTY]: "MESSAGE: BIO_EMPTY",
  [BIO_INVALID_TYPE]: "MESSAGE: BIO_INVALID_TYPE",
  [BIO_MAXLENGTH_REACH]: "MESSAGE: BIO_MAXLENGTH_REACH",
  [BIO_MINLENGTH_REACH]: "MESSAGE: BIO_MINLENGTH_REACH",
  [BLACKLIST_INVALID_TYPE]: "MESSAGE: BLACKLIST_INVALID_TYPE",
  [BLACKLIST_ITEM_EXIST]: "MESSAGE: BLACKLIST_ITEM_EXIST",
  [BLACKLIST_ITEM_NOT_EXIST]: "MESSAGE: BLACKLIST_ITEM_NOT_EXIST",
  [CELLPHONE_EXIST]: "MESSAGE: CELLPHONE_EXIST",
  [CELLPHONE_EXIST_IN_CONTACT]: "MESSAGE: CELLPHONE_EXIST_IN_CONTACT",
  [CELLPHONE_INVALID]: "MESSAGE: CELLPHONE_INVALID",
  [CELLPHONE_NOT_EXIST]: "MESSAGE: CELLPHONE_NOT_EXIST",
  [CELLPHONE_REQUIRED]: "MESSAGE: CELLPHONE_REQUIRED",
  [CHAT_EXIST]: "MESSAGE: CHAT_EXIST",
  [CHAT_ID_EMPTY]: "MESSAGE: CHAT_ID_EMPTY",
  [CHAT_ID_EXIST]: "MESSAGE: CHAT_ID_EXIST",
  [CHAT_ID_INVALID]: "MESSAGE: CHAT_ID_INVALID",
  [CHAT_ID_INVALID_TYPE]: "MESSAGE: CHAT_ID_INVALID_TYPE",
  [CHAT_ID_MAX_LENGTH_REACH]: "MESSAGE: CHAT_ID_MAX_LENGTH_REACH",
  [CHAT_ID_MIN_LENGTH_REACH]: "MESSAGE: CHAT_ID_MIN_LENGTH_REACH",
  [CHAT_ID_REQUIRED]: "MESSAGE: CHAT_ID_REQUIRED",
  [CHAT_NOT_EXIST]: "MESSAGE: CHAT_NOT_EXIST",
  [CHATS_INVALID_TYPE]: "MESSAGE: CHATS_INVALID_TYPE",
  [CONTACT_INVALID_TYPE]: "MESSAGE: CONTACT_INVALID_TYPE",
  [CONTACT_ITEM_EXIST]: "MESSAGE: CONTACT_ITEM_EXIST",
  [CONTACT_ITEM_NOT_EXIST]: "MESSAGE: CONTACT_ITEM_NOT_EXIST",
  [COUNTRY_CODE_EMPTY]: "MESSAGE: COUNTRY_CODE_EMPTY",
  [COUNTRY_CODE_INVALID]: "MESSAGE: COUNTRY_CODE_INVALID",
  [COUNTRY_CODE_INVALID_TYPE]: "MESSAGE: COUNTRY_CODE_INVALID_TYPE",
  [COUNTRY_CODE_MAXLENGTH_REACH]: "MESSAGE: COUNTRY_CODE_MAXLENGTH_REACH",
  [COUNTRY_CODE_MINLENGTH_REACH]: "MESSAGE: COUNTRY_CODE_MINLENGTH_REACH",
  [COUNTRY_CODE_NOT_SUPPORTED]: "MESSAGE: COUNTRY_CODE_NOT_SUPPORTED",
  [COUNTRY_CODE_NUMERIC]: "MESSAGE: COUNTRY_CODE_NUMERIC",
  [COUNTRY_CODE_REQUIRED]: "MESSAGE: COUNTRY_CODE_REQUIRED",
  [COUNTRY_NAME_EMPTY]: "MESSAGE: COUNTRY_NAME_EMPTY",
  [COUNTRY_NAME_INVALID]: "MESSAGE: COUNTRY_NAME_INVALID",
  [COUNTRY_NAME_INVALID_TYPE]: "MESSAGE: COUNTRY_NAME_INVALID_TYPE",
  [COUNTRY_NAME_MAXLENGTH_REACH]: "MESSAGE: COUNTRY_NAME_MAXLENGTH_REACH",
  [COUNTRY_NAME_MINLENGTH_REACH]: "MESSAGE: COUNTRY_NAME_MINLENGTH_REACH",
  [COUNTRY_NAME_NOT_SUPPORTED]: "MESSAGE: COUNTRY_NAME_NOT_SUPPORTED",
  [COUNTRY_NAME_REQUIRED]: "MESSAGE: COUNTRY_NAME_REQUIRED",
  [COUNTRY_NOT_SUPPORTED]: "MESSAGE: COUNTRY_NOT_SUPPORTED",
  [CREATED_AT_INVALID_TYPE]: "MESSAGE: CREATED_AT_INVALID_TYPE",
  [CREATED_AT_REQUIRED]: "MESSAGE: CREATED_AT_REQUIRED",
  [FIRST_NAME_EMPTY]: "MESSAGE: FIRST_NAME_EMPTY",
  [FIRST_NAME_INVALID_TYPE]: "MESSAGE: FIRST_NAME_INVALID_TYPE",
  [FIRST_NAME_MAXLENGTH_REACH]: "MESSAGE: FIRST_NAME_MAXLENGTH_REACH",
  [FIRST_NAME_MINLENGTH_REACH]: "MESSAGE: FIRST_NAME_MINLENGTH_REACH",
  [FIRST_NAME_REQUIRED]: "MESSAGE: FIRST_NAME_REQUIRED",
  [FULL_NAME_INVALID]: "MESSAGE: FULL_NAME_INVALID",
  [INPUT_FIELDS_MISSING]: "MESSAGE: INPUT_FIELDS_MISSING",
  [INPUT_FIELDS_OVERLOAD]: "MESSAGE: INPUT_FIELDS_OVERLOAD",
  [LAST_NAME_EMPTY]: "MESSAGE: LAST_NAME_EMPTY",
  [LAST_NAME_INVALID]: "MESSAGE: LAST_NAME_INVALID",
  [LAST_NAME_INVALID_TYPE]: "MESSAGE: LAST_NAME_INVALID_TYPE",
  [LAST_NAME_MAXLENGTH_REACH]: "MESSAGE: LAST_NAME_MAXLENGTH_REACH",
  [LAST_NAME_MINLENGTH_REACH]: "MESSAGE: LAST_NAME_MINLENGTH_REACH",
  [LAST_NAME_REQUIRED]: "MESSAGE: LAST_NAME_REQUIRED",
  [MAC_ADDRESS_EMPTY]: "MESSAGE: MAC_ADDRESS_EMPTY",
  [MAC_ADDRESS_EXIST]: "MESSAGE: MAC_ADDRESS_EXIST",
  [MAC_ADDRESS_INVALID_TYPE]: "MESSAGE: MAC_ADDRESS_INVALID_TYPE",
  [MAC_ADDRESS_MAXLENGTH_REACH]: "MESSAGE: MAC_ADDRESS_MAXLENGTH_REACH",
  [MAC_ADDRESS_MINLENGTH_REACH]: "MESSAGE: MAC_ADDRESS_MINLENGTH_REACH",
  [MAC_ADDRESS_REQUIRED]: "MESSAGE: MAC_ADDRESS_REQUIRED",
  [MESSAGE_ID_EXIST]: "MESSAGE: MESSAGE_ID_EXIST",
  [MESSAGE_ID_INVALID_TYPE]: "MESSAGE: MESSAGE_ID_INVALID_TYPE",
  [MESSAGE_ID_MAX_LENGTH_REACH]: "MESSAGE: MESSAGE_ID_MAX_LENGTH_REACH",
  [MESSAGE_ID_MIN_LENGTH_REACH]: "MESSAGE: MESSAGE_ID_MIN_LENGTH_REACH",
  [MESSAGE_ID_REQUIRED]: "MESSAGE: MESSAGE_ID_REQUIRED",
  [MESSAGE_TEXT_EMPTY]: "MESSAGE: MESSAGE_TEXT_EMPTY",
  [MESSAGE_TEXT_INVALID]: "MESSAGE: MESSAGE_TEXT_INVALID",
  [MESSAGE_TEXT_INVALID_TYPE]: "MESSAGE: MESSAGE_TEXT_INVALID_TYPE",
  [MESSAGE_TEXT_MAX_LENGTH_REACH]: "MESSAGE: MESSAGE_TEXT_MAX_LENGTH_REACH",
  [MESSAGE_TEXT_MIN_LENGTH_REACH]: "MESSAGE: MESSAGE_TEXT_MIN_LENGTH_REACH",
  [MESSAGE_TEXT_REQUIRED]: "MESSAGE: MESSAGE_TEXT_REQUIRED",
  [METHOD_NOT_ALLOWED]: "MESSAGE: METHOD_NOT_ALLOWED",
  [NO_ROUTE_OBJECT]: "MESSAGE: NO_ROUTE_OBJECT",
  [OUTPUT_FIELDS_MISSING]: "MESSAGE: OUTPUT_FIELDS_MISSING",
  [OUTPUT_FIELDS_OVERLOAD]: "MESSAGE: OUTPUT_FIELDS_OVERLOAD",
  [PARTICIPANT_EMPTY]: "MESSAGE: PARTICIPANT_EMPTY",
  [PARTICIPANT_ID_EXIST]: "MESSAGE: PARTICIPANT_ID_EXIST",
  [PARTICIPANT_ID_INVALID]: "MESSAGE: PARTICIPANT_ID_INVALID",
  [PARTICIPANT_ID_INVALID_TYPE]: "MESSAGE: PARTICIPANT_ID_INVALID_TYPE",
  [PARTICIPANT_ID_MAX_LENGTH_REACH]: "MESSAGE: PARTICIPANT_ID_MAX_LENGTH_REACH",
  [PARTICIPANT_ID_MIN_LENGTH_REACH]: "MESSAGE: PARTICIPANT_ID_MIN_LENGTH_REACH",
  [PARTICIPANT_ID_REQUIRED]: "MESSAGE: PARTICIPANT_ID_REQUIRED",
  [PARTICIPANT_NOT_EXIST]: "MESSAGE: PARTICIPANT_NOT_EXIST",
  [PHONE_NUMBER_EMPTY]: "MESSAGE: PHONE_NUMBER_EMPTY",
  [PHONE_NUMBER_EXIST]: "MESSAGE: PHONE_NUMBER_EXIST",
  [PHONE_NUMBER_INVALID]: "MESSAGE: PHONE_NUMBER_INVALID",
  [PHONE_NUMBER_INVALID_TYPE]: "MESSAGE: PHONE_NUMBER_INVALID_TYPE",
  [PHONE_NUMBER_MAXLENGTH_REACH]: "MESSAGE: PHONE_NUMBER_MAXLENGTH_REACH",
  [PHONE_NUMBER_MINLENGTH_REACH]: "MESSAGE: PHONE_NUMBER_MINLENGTH_REACH",
  [PHONE_NUMBER_NUMERIC]: "MESSAGE: PHONE_NUMBER_NUMERIC",
  [PHONE_NUMBER_REQUIRED]: "MESSAGE: PHONE_NUMBER_REQUIRED",
  [PRIVATE_ID_EMPTY]: "MESSAGE: PRIVATE_ID_EMPTY",
  [PRIVATE_ID_EXIST]: "MESSAGE: PRIVATE_ID_EXIST",
  [PRIVATE_ID_INVALID]: "MESSAGE: PRIVATE_ID_INVALID",
  [PRIVATE_ID_INVALID_TYPE]: "MESSAGE: PRIVATE_ID_INVALID_TYPE",
  [PRIVATE_ID_MAX_LENGTH_REACH]: "MESSAGE: PRIVATE_ID_MAX_LENGTH_REACH",
  [PRIVATE_ID_MIN_LENGTH_REACH]: "MESSAGE: PRIVATE_ID_MIN_LENGTH_REACH",
  [PRIVATE_ID_REQUIRED]: "MESSAGE: PRIVATE_ID_REQUIRED",
  [REQUEST_BODY_IS_UNDEFINED]: "MESSAGE: REQUEST_BODY_IS_UNDEFINED",
  [REQUIRED_FIELDS_NOT_DEFINED]: "MESSAGE: REQUIRED_FIELDS_NOT_DEFINED",
  [REQUIRED_IO_FIELD_IS_NOT_ARRAY]: "MESSAGE: REQUIRED_IO_FIELD_IS_NOT_ARRAY",
  [REQUIRED_IO_FIELD_IS_NOT_OBJECT]: "MESSAGE: REQUIRED_IO_FIELD_IS_NOT_OBJECT",
  [ROUTE_NOT_FOUND]: "MESSAGE: ROUTE_NOT_FOUND",
  [SELF_STUFF]: "MESSAGE: SELF_STUFF",
  [SEND_JSON_RESPONSE_IS_NOT_FUNCTION]:
    "MESSAGE: SEND_JSON_RESPONSE_IS_NOT_FUNCTION",
  [SEND_SMS_FAILED]: "MESSAGE: SEND_SMS_FAILED",
  [SENDER_EMPTY]: "MESSAGE: SENDER_EMPTY",
  [SENDER_ID_EXIST]: "MESSAGE: SENDER_ID_EXIST",
  [SENDER_ID_INVALID_TYPE]: "MESSAGE: SENDER_ID_INVALID_TYPE",
  [SENDER_ID_MAX_LENGTH_REACH]: "MESSAGE: SENDER_ID_MAX_LENGTH_REACH",
  [SENDER_ID_MIN_LENGTH_REACH]: "MESSAGE: SENDER_ID_MIN_LENGTH_REACH",
  [SENDER_ID_REQUIRED]: "MESSAGE: SENDER_ID_REQUIRED",
  [TARGET_USER_NOT_EXIST]: "MESSAGE: TARGET_USER_NOT_EXIST",
  [TOKEN_CAN_NOT_VERIFIED]: "MESSAGE: TOKEN_CAN_NOT_VERIFIED",
  [TOKEN_EXIST]: "MESSAGE: TOKEN_EXIST",
  [TOKEN_INVALID]: "MESSAGE: TOKEN_INVALID",
  [TOKEN_INVALID_TYPE]: "MESSAGE: TOKEN_INVALID_TYPE",
  [TOKEN_REQUIRED]: "MESSAGE: TOKEN_REQUIRED",
  [UNKNOWN_ERROR]: "MESSAGE: UNKNOWN_ERROR",
  [USER_EXIST]: "MESSAGE: USER_EXIST",
  [USER_NO_LONGER_PARTICIPANT]: "MESSAGE: USER_NO_LONGER_PARTICIPANT",
  [USER_NOT_EXIST]: "MESSAGE: USER_NOT_EXIST",
  [USERNAME_EMPTY]: "MESSAGE: USERNAME_EMPTY",
  [USERNAME_EXIST]: "MESSAGE: USERNAME_EXIST",
  [USERNAME_INVALID]: "MESSAGE: USERNAME_INVALID",
  [USERNAME_INVALID_TYPE]: "MESSAGE: USERNAME_INVALID_TYPE",
  [USERNAME_MAXLENGTH_REACH]: "MESSAGE: USERNAME_MAXLENGTH_REACH",
  [USERNAME_MINLENGTH_REACH]: "MESSAGE: USERNAME_MINLENGTH_REACH",
  [USERNAME_REQUIRED]: "MESSAGE: USERNAME_REQUIRED",
  [VERIFICATION_CODE_EMPTY]: "MESSAGE: VERIFICATION_CODE_EMPTY",
  [VERIFICATION_CODE_INVALID]: "MESSAGE: VERIFICATION_CODE_INVALID",
  [VERIFICATION_CODE_INVALID_LENGTH]:
    "MESSAGE: VERIFICATION_CODE_INVALID_LENGTH",
  [VERIFICATION_CODE_INVALID_TYPE]: "MESSAGE: VERIFICATION_CODE_INVALID_TYPE",
  [VERIFICATION_CODE_MAXLENGTH_REACH]:
    "MESSAGE: VERIFICATION_CODE_MAXLENGTH_REACH",
  [VERIFICATION_CODE_NUMERIC]: "MESSAGE: VERIFICATION_CODE_NUMERIC",
  [VERIFICATION_CODE_REQUIRED]: "MESSAGE: VERIFICATION_CODE_REQUIRED",
};

module.exports = { enErrorMessages };
