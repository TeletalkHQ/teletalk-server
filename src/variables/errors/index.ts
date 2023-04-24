import { errorBuilder } from "@/classes/ErrorBuilder";
import { ErrorCollection } from "@/types";

const ERRORS: ErrorCollection = {
  BIO_EMPTY: errorBuilder
    .create()
    .reason("BIO_EMPTY")
    .key("BIO_VALIDATION")
    .build(),
  BIO_INVALID: errorBuilder
    .create()
    .reason("BIO_INVALID")
    .key("BIO_VALIDATION")
    .build(),
  BIO_INVALID_TYPE: errorBuilder
    .create()
    .reason("BIO_INVALID_TYPE")
    .key("BIO_VALIDATION")
    .build(),
  BIO_MAX_LENGTH_REACH: errorBuilder
    .create()
    .reason("BIO_MAX_LENGTH_REACH")
    .key("BIO_VALIDATION")
    .build(),
  BIO_MIN_LENGTH_REACH: errorBuilder
    .create()
    .reason("BIO_MIN_LENGTH_REACH")
    .key("BIO_VALIDATION")
    .build(),
  BIO_REQUIRED: errorBuilder
    .create()
    .reason("BIO_REQUIRED")
    .key("BIO_VALIDATION")
    .build(),
  BLACKLIST_INVALID_TYPE: errorBuilder
    .create()
    .reason("BLACKLIST_INVALID_TYPE")
    .key("BLACKLIST_VALIDATION")
    .build(),
  BLACKLIST_ITEM_EXIST: errorBuilder
    .create()
    .reason("BLACKLIST_ITEM_EXIST")
    .key("BLACKLIST_VALIDATION")
    .build(),
  BLACKLIST_ITEM_NOT_EXIST: errorBuilder
    .create()
    .reason("BLACKLIST_ITEM_NOT_EXIST")
    .key("BLACKLIST_VALIDATION")
    .build(),
  BLACKLIST_REQUIRED: errorBuilder
    .create()
    .reason("BLACKLIST_REQUIRED")
    .key("BLACKLIST_VALIDATION")
    .build(),
  CHAT_EXIST: errorBuilder
    .create()
    .reason("CHAT_EXIST")
    .key("CHAT_VALIDATION")
    .build(),
  CHAT_ID_EMPTY: errorBuilder
    .create()
    .reason("CHAT_ID_EMPTY")
    .key("CHAT_ID_VALIDATION")
    .build(),
  CHAT_ID_EXIST: errorBuilder
    .create()
    .reason("CHAT_ID_EXIST")
    .key("CHAT_ID_VALIDATION")
    .build(),
  CHAT_ID_INVALID: errorBuilder
    .create()
    .reason("CHAT_ID_INVALID")
    .key("CHAT_ID_VALIDATION")
    .build(),
  CHAT_ID_INVALID_TYPE: errorBuilder
    .create()
    .reason("CHAT_ID_INVALID_TYPE")
    .key("CHAT_ID_VALIDATION")
    .build(),
  CHAT_ID_MAX_LENGTH_REACH: errorBuilder
    .create()
    .reason("CHAT_ID_MAX_LENGTH_REACH")
    .key("CHAT_ID_VALIDATION")
    .build(),
  CHAT_ID_MIN_LENGTH_REACH: errorBuilder
    .create()
    .reason("CHAT_ID_MIN_LENGTH_REACH")
    .key("CHAT_ID_VALIDATION")
    .build(),
  CHAT_ID_REQUIRED: errorBuilder
    .create()
    .reason("CHAT_ID_REQUIRED")
    .key("CHAT_ID_VALIDATION")
    .build(),
  CHAT_NOT_EXIST: errorBuilder
    .create()
    .reason("CHAT_NOT_EXIST")
    .key("CHAT_VALIDATION")
    .build(),
  CHATS_INVALID_TYPE: errorBuilder
    .create()
    .reason("CHATS_INVALID_TYPE")
    .key("CHATS_VALIDATION")
    .build(),
  CLIENT_ID_EMPTY: errorBuilder
    .create()
    .reason("CLIENT_ID_EMPTY")
    .key("CLIENT_ID_VALIDATION")
    .build(),
  CLIENT_ID_EXIST: errorBuilder
    .create()
    .reason("CLIENT_ID_EXIST")
    .key("CLIENT_ID_VALIDATION")
    .build(),
  CLIENT_ID_INVALID_TYPE: errorBuilder
    .create()
    .reason("CLIENT_ID_INVALID_TYPE")
    .key("CLIENT_ID_VALIDATION")
    .build(),
  CLIENT_ID_MAX_LENGTH_REACH: errorBuilder
    .create()
    .reason("CLIENT_ID_MAX_LENGTH_REACH")
    .key("CLIENT_ID_VALIDATION")
    .build(),
  CLIENT_ID_MIN_LENGTH_REACH: errorBuilder
    .create()
    .reason("CLIENT_ID_MIN_LENGTH_REACH")
    .key("CLIENT_ID_VALIDATION")
    .build(),
  CLIENT_ID_NOT_DEFINED: errorBuilder
    .create()
    .reason("CLIENT_ID_NOT_DEFINED")
    .key("CLIENT_ID_VALIDATION")
    .build(),
  CLIENT_ID_REQUIRED: errorBuilder
    .create()
    .reason("CLIENT_ID_REQUIRED")
    .key("CLIENT_ID_VALIDATION")
    .build(),
  CLIENT_NOT_FOUND: errorBuilder
    .create()
    .authError()
    .reason("CLIENT_NOT_FOUND")
    .key("CLIENT_VALIDATION")
    .build(),
  CLIENT_NOT_VERIFIED: errorBuilder
    .create()
    .authError()
    .reason("CLIENT_NOT_VERIFIED")
    .key("CLIENT_VALIDATION")
    .build(),
  CONTACT_INVALID_TYPE: errorBuilder
    .create()
    .reason("CONTACT_INVALID_TYPE")
    .key("CONTACT_VALIDATION")
    .build(),
  CONTACT_ITEM_EXIST: errorBuilder
    .create()
    .reason("CONTACT_ITEM_EXIST")
    .key("CONTACT_VALIDATION")
    .build(),
  CONTACT_ITEM_NOT_EXIST: errorBuilder
    .create()
    .reason("CONTACT_ITEM_NOT_EXIST")
    .key("CONTACT_VALIDATION")
    .build(),
  CONTACTS_INVALID_TYPE: errorBuilder
    .create()
    .reason("CONTACTS_INVALID_TYPE")
    .key("CONTACT_VALIDATION")
    .build(),
  CONTACTS_REQUIRED: errorBuilder
    .create()
    .reason("CONTACTS_REQUIRED")
    .key("CONTACT_VALIDATION")
    .build(),
  COOKIE_IS_UNDEFINED: errorBuilder
    .create()
    .reason("COOKIE_IS_UNDEFINED")
    .side("client")
    .authError()
    .key("SESSION_VALIDATION")
    .build(),
  COUNTRY_CODE_EMPTY: errorBuilder
    .create()
    .reason("COUNTRY_CODE_EMPTY")
    .key("COUNTRY_CODE_VALIDATION")
    .build(),
  COUNTRY_CODE_INVALID: errorBuilder
    .create()
    .reason("COUNTRY_CODE_INVALID")
    .key("COUNTRY_CODE_VALIDATION")
    .build(),
  COUNTRY_CODE_INVALID_TYPE: errorBuilder
    .create()
    .reason("COUNTRY_CODE_INVALID_TYPE")
    .key("COUNTRY_CODE_VALIDATION")
    .build(),
  COUNTRY_CODE_MAX_LENGTH_REACH: errorBuilder
    .create()
    .reason("COUNTRY_CODE_MAX_LENGTH_REACH")
    .key("COUNTRY_CODE_VALIDATION")
    .build(),
  COUNTRY_CODE_MIN_LENGTH_REACH: errorBuilder
    .create()
    .reason("COUNTRY_CODE_MIN_LENGTH_REACH")
    .key("COUNTRY_CODE_VALIDATION")
    .build(),
  COUNTRY_CODE_NOT_SUPPORTED: errorBuilder
    .create()
    .reason("COUNTRY_CODE_NOT_SUPPORTED")
    .key("COUNTRY_CODE_VALIDATION")
    .build(),
  COUNTRY_CODE_NUMERIC: errorBuilder
    .create()
    .reason("COUNTRY_CODE_NUMERIC")
    .key("COUNTRY_CODE_VALIDATION")
    .build(),
  COUNTRY_CODE_REQUIRED: errorBuilder
    .create()
    .reason("COUNTRY_CODE_REQUIRED")
    .key("COUNTRY_CODE_VALIDATION")
    .build(),
  COUNTRY_NAME_EMPTY: errorBuilder
    .create()
    .reason("COUNTRY_NAME_EMPTY")
    .key("COUNTRY_NAME_VALIDATION")
    .build(),
  COUNTRY_NAME_INVALID: errorBuilder
    .create()
    .reason("COUNTRY_NAME_INVALID")
    .key("COUNTRY_NAME_VALIDATION")
    .build(),
  COUNTRY_NAME_INVALID_TYPE: errorBuilder
    .create()
    .reason("COUNTRY_NAME_INVALID_TYPE")
    .key("COUNTRY_NAME_VALIDATION")
    .build(),
  COUNTRY_NAME_MAX_LENGTH_REACH: errorBuilder
    .create()
    .reason("COUNTRY_NAME_MAX_LENGTH_REACH")
    .key("COUNTRY_NAME_VALIDATION")
    .build(),
  COUNTRY_NAME_MIN_LENGTH_REACH: errorBuilder
    .create()
    .reason("COUNTRY_NAME_MIN_LENGTH_REACH")
    .key("COUNTRY_NAME_VALIDATION")
    .build(),
  COUNTRY_NAME_NOT_SUPPORTED: errorBuilder
    .create()
    .reason("COUNTRY_NAME_NOT_SUPPORTED")
    .key("COUNTRY_NAME_VALIDATION")
    .build(),
  COUNTRY_NAME_REQUIRED: errorBuilder
    .create()
    .reason("COUNTRY_NAME_REQUIRED")
    .key("COUNTRY_NAME_VALIDATION")
    .build(),
  COUNTRY_NOT_SUPPORTED: errorBuilder
    .create()
    .reason("COUNTRY_NOT_SUPPORTED")
    .key("COUNTRY_NOT_SUPPORTED_VALIDATION")
    .build(),
  CREATED_AT_EMPTY: errorBuilder
    .create()
    .reason("CREATED_AT_EMPTY")
    .key("CREATED_AT_VALIDATION")
    .build(),
  CREATED_AT_INVALID_TYPE: errorBuilder
    .create()
    .reason("CREATED_AT_INVALID_TYPE")
    .key("CREATED_AT_VALIDATION")
    .build(),
  CREATED_AT_REQUIRED: errorBuilder
    .create()
    .reason("CREATED_AT_REQUIRED")
    .key("CREATED_AT_VALIDATION")
    .build(),
  CURRENT_SESSION_NOT_EXIST: errorBuilder
    .create()
    .reason("CURRENT_SESSION_NOT_EXIST")
    .key("USER_VALIDATION")
    .build(),
  CURRENT_USER_EXIST: errorBuilder
    .create()
    .authError()
    .reason("CURRENT_USER_EXIST")
    .key("USER_VALIDATION")
    .build(),
  CURRENT_USER_NOT_EXIST: errorBuilder
    .create()
    .authError()
    .reason("CURRENT_USER_NOT_EXIST")
    .key("USER_VALIDATION")
    .build(),
  EVENT_NOT_FOUND: errorBuilder
    .create()
    .key("UNKNOWN_EVENT")
    .reason("EVENT_NOT_FOUND")
    .build(),
  FIRST_NAME_EMPTY: errorBuilder
    .create()
    .reason("FIRST_NAME_EMPTY")
    .key("FIRST_NAME_VALIDATION")
    .build(),
  FIRST_NAME_INVALID: errorBuilder
    .create()
    .reason("FIRST_NAME_INVALID")
    .key("FIRST_NAME_VALIDATION")
    .build(),
  FIRST_NAME_INVALID_TYPE: errorBuilder
    .create()
    .reason("FIRST_NAME_INVALID_TYPE")
    .key("FIRST_NAME_VALIDATION")
    .build(),
  FIRST_NAME_MAX_LENGTH_REACH: errorBuilder
    .create()
    .reason("FIRST_NAME_MAX_LENGTH_REACH")
    .key("FIRST_NAME_VALIDATION")
    .build(),
  FIRST_NAME_MIN_LENGTH_REACH: errorBuilder
    .create()
    .reason("FIRST_NAME_MIN_LENGTH_REACH")
    .key("FIRST_NAME_VALIDATION")
    .build(),
  FIRST_NAME_REQUIRED: errorBuilder
    .create()
    .reason("FIRST_NAME_REQUIRED")
    .key("FIRST_NAME_VALIDATION")
    .build(),
  FULL_NAME_INVALID: errorBuilder
    .create()
    .reason("FULL_NAME_INVALID")
    .key("FULL_NAME_VALIDATION")
    .build(),
  INPUT_DATA_NOT_DEFINED: errorBuilder
    .create()
    .key("INPUT_OUTPUT_FIELDS")
    .reason("INPUT_DATA_NOT_DEFINED")
    .build(),
  INPUT_FIELD_INVALID_TYPE: errorBuilder
    .create()
    .key("INPUT_OUTPUT_FIELDS")
    .reason("INPUT_FIELD_INVALID_TYPE")
    .build(),
  INPUT_FIELDS_MISSING: errorBuilder
    .create()
    .key("INPUT_OUTPUT_FIELDS")
    .reason("INPUT_FIELDS_MISSING")
    .build(),
  INPUT_FIELDS_OVERLOAD: errorBuilder
    .create()
    .key("INPUT_OUTPUT_FIELDS")
    .reason("INPUT_FIELDS_OVERLOAD")
    .build(),
  IS_NOT_A_CALLBACK: errorBuilder
    .create()
    .key("SOCKET_ARGS_VALIDATION")
    .reason("IS_NOT_A_CALLBACK")
    .build(),
  LAST_NAME_EMPTY: errorBuilder
    .create()
    .reason("LAST_NAME_EMPTY")
    .key("LAST_NAME_VALIDATION")
    .build(),
  LAST_NAME_INVALID: errorBuilder
    .create()
    .reason("LAST_NAME_INVALID")
    .key("LAST_NAME_VALIDATION")
    .build(),
  LAST_NAME_INVALID_TYPE: errorBuilder
    .create()
    .reason("LAST_NAME_INVALID_TYPE")
    .key("LAST_NAME_VALIDATION")
    .build(),
  LAST_NAME_MAX_LENGTH_REACH: errorBuilder
    .create()
    .reason("LAST_NAME_MAX_LENGTH_REACH")
    .key("LAST_NAME_VALIDATION")
    .build(),
  LAST_NAME_MIN_LENGTH_REACH: errorBuilder
    .create()
    .reason("LAST_NAME_MIN_LENGTH_REACH")
    .key("LAST_NAME_VALIDATION")
    .build(),
  LAST_NAME_REQUIRED: errorBuilder
    .create()
    .reason("LAST_NAME_REQUIRED")
    .key("LAST_NAME_VALIDATION")
    .build(),
  MAC_ADDRESS_EMPTY: errorBuilder
    .create()
    .reason("MAC_ADDRESS_EMPTY")
    .key("MAC_ADDRESS_VALIDATION")
    .build(),
  MAC_ADDRESS_EXIST: errorBuilder
    .create()
    .reason("MAC_ADDRESS_EXIST")
    .key("MAC_ADDRESS_VALIDATION")
    .build(),
  MAC_ADDRESS_INVALID_TYPE: errorBuilder
    .create()
    .reason("MAC_ADDRESS_INVALID_TYPE")
    .key("MAC_ADDRESS_VALIDATION")
    .build(),
  MAC_ADDRESS_MAX_LENGTH_REACH: errorBuilder
    .create()
    .reason("MAC_ADDRESS_MAX_LENGTH_REACH")
    .key("MAC_ADDRESS_VALIDATION")
    .build(),
  MAC_ADDRESS_MIN_LENGTH_REACH: errorBuilder
    .create()
    .reason("MAC_ADDRESS_MIN_LENGTH_REACH")
    .key("MAC_ADDRESS_VALIDATION")
    .build(),
  MAC_ADDRESS_REQUIRED: errorBuilder
    .create()
    .reason("MAC_ADDRESS_REQUIRED")
    .key("MAC_ADDRESS_VALIDATION")
    .build(),
  MESSAGE_ID_EMPTY: errorBuilder
    .create()
    .reason("MESSAGE_ID_EMPTY")
    .key("MESSAGE_ID_VALIDATION")
    .build(),
  MESSAGE_ID_EXIST: errorBuilder
    .create()
    .reason("MESSAGE_ID_EXIST")
    .key("MESSAGE_ID_VALIDATION")
    .build(),
  MESSAGE_ID_INVALID_TYPE: errorBuilder
    .create()
    .reason("MESSAGE_ID_INVALID_TYPE")
    .key("MESSAGE_ID_VALIDATION")
    .build(),
  MESSAGE_ID_MAX_LENGTH_REACH: errorBuilder
    .create()
    .reason("MESSAGE_ID_MAX_LENGTH_REACH")
    .key("MESSAGE_ID_VALIDATION")
    .build(),
  MESSAGE_ID_MIN_LENGTH_REACH: errorBuilder
    .create()
    .reason("MESSAGE_ID_MIN_LENGTH_REACH")
    .key("MESSAGE_ID_VALIDATION")
    .build(),
  MESSAGE_ID_REQUIRED: errorBuilder
    .create()
    .reason("MESSAGE_ID_REQUIRED")
    .key("MESSAGE_ID_VALIDATION")
    .build(),
  MESSAGE_TEXT_EMPTY: errorBuilder
    .create()
    .reason("MESSAGE_TEXT_EMPTY")
    .key("MESSAGE_TEXT_VALIDATION")
    .build(),
  MESSAGE_TEXT_INVALID: errorBuilder
    .create()
    .reason("MESSAGE_TEXT_INVALID")
    .key("MESSAGE_TEXT_VALIDATION")
    .build(),
  MESSAGE_TEXT_INVALID_TYPE: errorBuilder
    .create()
    .reason("MESSAGE_TEXT_INVALID_TYPE")
    .key("MESSAGE_TEXT_VALIDATION")
    .build(),
  MESSAGE_TEXT_MAX_LENGTH_REACH: errorBuilder
    .create()
    .reason("MESSAGE_TEXT_MAX_LENGTH_REACH")
    .key("MESSAGE_TEXT_VALIDATION")
    .build(),
  MESSAGE_TEXT_MIN_LENGTH_REACH: errorBuilder
    .create()
    .reason("MESSAGE_TEXT_MIN_LENGTH_REACH")
    .key("MESSAGE_TEXT_VALIDATION")
    .build(),
  MESSAGE_TEXT_REQUIRED: errorBuilder
    .create()
    .reason("MESSAGE_TEXT_REQUIRED")
    .key("MESSAGE_TEXT_VALIDATION")
    .build(),
  MESSAGES_INVALID_TYPE: errorBuilder
    .create()
    .reason("MESSAGES_INVALID_TYPE")
    .key("MESSAGES_VALIDATION")
    .build(),
  MESSAGES_REQUIRED: errorBuilder
    .create()
    .reason("MESSAGES_REQUIRED")
    .key("MESSAGES_VALIDATION")
    .build(),
  ONLINE_INVALID_TYPE: errorBuilder
    .create()
    .reason("ONLINE_INVALID_TYPE")
    .key("ONLINE_VALIDATION")
    .build(),
  ONLINE_REQUIRED: errorBuilder
    .create()
    .reason("ONLINE_REQUIRED")
    .key("ONLINE_VALIDATION")
    .build(),
  OUTPUT_DATA_NOT_DEFINED: errorBuilder
    .create()
    .reason("OUTPUT_DATA_NOT_DEFINED")
    .key("ONLINE_VALIDATION")
    .build(),
  OUTPUT_FIELD_INVALID_TYPE: errorBuilder
    .create()
    .key("INTERNAL_SERVER_ERROR")
    .reason("OUTPUT_FIELD_INVALID_TYPE")
    .side("server")
    .build(),
  OUTPUT_FIELD_TYPE_WRONG: errorBuilder
    .create()
    .key("INTERNAL_SERVER_ERROR")
    .reason("OUTPUT_FIELD_TYPE_WRONG")
    .side("server")
    .build(),
  OUTPUT_FIELDS_MISSING: errorBuilder
    .create()
    .key("INPUT_OUTPUT_FIELDS")
    .reason("OUTPUT_FIELDS_MISSING")
    .side("server")
    .build(),
  OUTPUT_FIELDS_OVERLOAD: errorBuilder
    .create()
    .key("INPUT_OUTPUT_FIELDS")
    .reason("OUTPUT_FIELDS_OVERLOAD")
    .side("server")
    .build(),
  PARTICIPANT_EMPTY: errorBuilder
    .create()
    .reason("PARTICIPANT_EMPTY")
    .key("PARTICIPANT_VALIDATION")
    .build(),
  PARTICIPANT_ID_EMPTY: errorBuilder
    .create()
    .reason("PARTICIPANT_ID_EMPTY")
    .key("PARTICIPANT_ID_VALIDATION")
    .build(),
  PARTICIPANT_ID_EXIST: errorBuilder
    .create()
    .reason("PARTICIPANT_ID_EXIST")
    .key("PARTICIPANT_ID_VALIDATION")
    .build(),
  PARTICIPANT_ID_INVALID: errorBuilder
    .create()
    .reason("PARTICIPANT_ID_INVALID")
    .key("PARTICIPANT_ID_VALIDATION")
    .build(),
  PARTICIPANT_ID_INVALID_TYPE: errorBuilder
    .create()
    .reason("PARTICIPANT_ID_INVALID_TYPE")
    .key("PARTICIPANT_ID_VALIDATION")
    .build(),
  PARTICIPANT_ID_MAX_LENGTH_REACH: errorBuilder
    .create()
    .reason("PARTICIPANT_ID_MAX_LENGTH_REACH")
    .key("PARTICIPANT_ID_VALIDATION")
    .build(),
  PARTICIPANT_ID_MIN_LENGTH_REACH: errorBuilder
    .create()
    .reason("PARTICIPANT_ID_MIN_LENGTH_REACH")
    .key("PARTICIPANT_ID_VALIDATION")
    .build(),
  PARTICIPANT_ID_REQUIRED: errorBuilder
    .create()
    .reason("PARTICIPANT_ID_REQUIRED")
    .key("PARTICIPANT_ID_VALIDATION")
    .build(),
  PARTICIPANT_NOT_EXIST: errorBuilder
    .create()
    .reason("PARTICIPANT_NOT_EXIST")
    .key("PARTICIPANT_ID_VALIDATION")
    .build(),
  PARTICIPANTS_EMPTY: errorBuilder
    .create()
    .reason("PARTICIPANTS_EMPTY")
    .key("PARTICIPANTS_VALIDATION")
    .build(),
  PARTICIPANTS_INVALID_LENGTH: errorBuilder
    .create()
    .reason("PARTICIPANTS_INVALID_LENGTH")
    .key("PARTICIPANTS_VALIDATION")
    .build(),
  PARTICIPANTS_INVALID_TYPE: errorBuilder
    .create()
    .reason("PARTICIPANTS_INVALID_TYPE")
    .key("PARTICIPANTS_VALIDATION")
    .build(),
  PARTICIPANTS_REQUIRED: errorBuilder
    .create()
    .reason("PARTICIPANTS_REQUIRED")
    .key("PARTICIPANTS_VALIDATION")
    .build(),
  PHONE_NUMBER_EMPTY: errorBuilder
    .create()
    .reason("PHONE_NUMBER_EMPTY")
    .key("PHONE_NUMBER_VALIDATION")
    .build(),
  PHONE_NUMBER_EXIST: errorBuilder
    .create()
    .reason("PHONE_NUMBER_EXIST")
    .key("PHONE_NUMBER_VALIDATION")
    .build(),
  PHONE_NUMBER_INVALID: errorBuilder
    .create()
    .reason("PHONE_NUMBER_INVALID")
    .key("PHONE_NUMBER_VALIDATION")
    .build(),
  PHONE_NUMBER_INVALID_TYPE: errorBuilder
    .create()
    .reason("PHONE_NUMBER_INVALID_TYPE")
    .key("PHONE_NUMBER_VALIDATION")
    .build(),
  PHONE_NUMBER_MAX_LENGTH_REACH: errorBuilder
    .create()
    .reason("PHONE_NUMBER_MAX_LENGTH_REACH")
    .key("PHONE_NUMBER_VALIDATION")
    .build(),
  PHONE_NUMBER_MIN_LENGTH_REACH: errorBuilder
    .create()
    .reason("PHONE_NUMBER_MIN_LENGTH_REACH")
    .key("PHONE_NUMBER_VALIDATION")
    .build(),
  PHONE_NUMBER_NUMERIC: errorBuilder
    .create()
    .reason("PHONE_NUMBER_NUMERIC")
    .key("PHONE_NUMBER_VALIDATION")
    .build(),
  PHONE_NUMBER_REQUIRED: errorBuilder
    .create()
    .reason("PHONE_NUMBER_REQUIRED")
    .key("PHONE_NUMBER_VALIDATION")
    .build(),
  PRIVATE_CHATS_INVALID_TYPE: errorBuilder
    .create()
    .reason("PRIVATE_CHATS_INVALID_TYPE")
    .key("PRIVATE_CHAT_VALIDATION")
    .build(),
  PRIVATE_CHATS_REQUIRED: errorBuilder
    .create()
    .reason("PRIVATE_CHATS_REQUIRED")
    .key("PRIVATE_CHAT_VALIDATION")
    .build(),
  REQUEST_BODY_IS_UNDEFINED: errorBuilder
    .create()
    .key("INTERNAL_SERVER_ERROR")
    .reason("REQUEST_BODY_IS_UNDEFINED")
    .side("server")
    .build(),
  REQUIRED_FIELD_INVALID: errorBuilder
    .create()
    .key("INTERNAL_SERVER_ERROR")
    .reason("REQUIRED_FIELD_INVALID")
    .side("server")
    .build(),
  REQUIRED_FIELD_INVALID_TYPE: errorBuilder
    .create()
    .key("INTERNAL_SERVER_ERROR")
    .reason("REQUIRED_FIELD_INVALID_TYPE")
    .side("server")
    .build(),
  REQUIRED_FIELDS_NOT_DEFINED: errorBuilder
    .create()
    .key("INTERNAL_SERVER_ERROR")
    .reason("REQUIRED_FIELDS_NOT_DEFINED")
    .side("server")
    .build(),
  REQUIRED_IO_FIELD_IS_NOT_ARRAY: errorBuilder
    .create()
    .key("INTERNAL_SERVER_ERROR")
    .reason("REQUIRED_IO_FIELD_IS_NOT_ARRAY")
    .side("server")
    .build(),
  REQUIRED_IO_FIELD_IS_NOT_OBJECT: errorBuilder
    .create()
    .key("INTERNAL_SERVER_ERROR")
    .reason("REQUIRED_IO_FIELD_IS_NOT_OBJECT")
    .side("server")
    .build(),
  ROUTE_NOT_FOUND: errorBuilder
    .create()
    .key("UNKNOWN_ROUTE")
    .reason("ROUTE_NOT_FOUND")
    .build(),
  SELF_STUFF: errorBuilder
    .create()
    .reason("SELF_STUFF")
    .key("SELF_STUFF_VALIDATION")
    .build(),
  SEND_JSON_RESPONSE_IS_NOT_FUNCTION: errorBuilder
    .create()
    .key("INTERNAL_SERVER_ERROR")
    .reason("SEND_JSON_RESPONSE_IS_NOT_FUNCTION")
    .side("server")
    .build(),
  SEND_SMS_FAILED: errorBuilder
    .create()
    .key("INTERNAL_SERVER_ERROR")
    .reason("SEND_SMS_FAILED")
    .side("server")
    .build(),
  SENDER_EMPTY: errorBuilder
    .create()
    .reason("SENDER_EMPTY")
    .key("SENDER_ID_VALIDATION")
    .build(),
  SENDER_ID_EXIST: errorBuilder
    .create()
    .reason("SENDER_ID_EXIST")
    .key("SENDER_ID_VALIDATION")
    .build(),
  SENDER_ID_INVALID_TYPE: errorBuilder
    .create()
    .reason("SENDER_ID_INVALID_TYPE")
    .key("SENDER_ID_VALIDATION")
    .build(),
  SENDER_ID_MAX_LENGTH_REACH: errorBuilder
    .create()
    .reason("SENDER_ID_MAX_LENGTH_REACH")
    .key("SENDER_ID_VALIDATION")
    .build(),
  SENDER_ID_MIN_LENGTH_REACH: errorBuilder
    .create()
    .reason("SENDER_ID_MIN_LENGTH_REACH")
    .key("SENDER_ID_VALIDATION")
    .build(),
  SENDER_ID_REQUIRED: errorBuilder
    .create()
    .reason("SENDER_ID_REQUIRED")
    .key("SENDER_ID_VALIDATION")
    .build(),
  SERVER_CRITICAL_ERROR: errorBuilder
    .create()
    .key("INTERNAL_SERVER_ERROR")
    .reason("SERVER_CRITICAL_ERROR")
    .side("server")
    .build(),
  SESSION_CAN_NOT_VERIFIED: errorBuilder
    .create()
    .authError()
    .reason("SESSION_CAN_NOT_VERIFIED")
    .key("SESSION_VALIDATION")
    .build(),
  SESSION_EMPTY: errorBuilder
    .create()
    .authError()
    .reason("SESSION_EMPTY")
    .key("SESSION_VALIDATION")
    .build(),
  SESSION_EXIST: errorBuilder
    .create()
    .reason("SESSION_EXIST")
    .key("SESSION_VALIDATION")
    .build(),
  SESSION_INVALID: errorBuilder
    .create()
    .authError()
    .reason("SESSION_INVALID")
    .key("SESSION_VALIDATION")
    .build(),
  SESSION_INVALID_TYPE: errorBuilder
    .create()
    .authError()
    .reason("SESSION_INVALID_TYPE")
    .key("SESSION_VALIDATION")
    .build(),
  SESSION_MAX_LENGTH_REACH: errorBuilder
    .create()
    .authError()
    .reason("SESSION_MAX_LENGTH_REACH")
    .key("SESSION_VALIDATION")
    .build(),
  SESSION_MIN_LENGTH_REACH: errorBuilder
    .create()
    .authError()
    .reason("SESSION_MIN_LENGTH_REACH")
    .key("SESSION_VALIDATION")
    .build(),
  SESSION_REQUIRED: errorBuilder
    .create()
    .authError()
    .reason("SESSION_REQUIRED")
    .key("SESSION_VALIDATION")
    .build(),
  SESSIONS_INVALID_TYPE: errorBuilder
    .create()
    .reason("SESSIONS_INVALID_TYPE")
    .key("SESSIONS_VALIDATION")
    .build(),
  SESSIONS_REQUIRED: errorBuilder
    .create()
    .reason("SESSIONS_REQUIRED")
    .key("SESSIONS_VALIDATION")
    .build(),
  STATUS_INVALID_TYPE: errorBuilder
    .create()
    .reason("STATUS_INVALID_TYPE")
    .key("STATUS_VALIDATION")
    .build(),
  STATUS_REQUIRED: errorBuilder
    .create()
    .reason("STATUS_REQUIRED")
    .key("STATUS_VALIDATION")
    .build(),
  TARGET_USER_NOT_EXIST: errorBuilder
    .create()
    .reason("TARGET_USER_NOT_EXIST")
    .key("TARGET_USER_VALIDATION")
    .build(),
  UNKNOWN_ERROR: errorBuilder
    .create()
    .key("INTERNAL_SERVER_ERROR")
    .reason("UNKNOWN_ERROR")
    .side("server")
    .build(),
  USER_EXIST: errorBuilder
    .create()
    .reason("USER_EXIST")
    .key("USER_VALIDATION")
    .build(),
  USER_ID_EMPTY: errorBuilder
    .create()
    .reason("USER_ID_EMPTY")
    .key("USER_ID_VALIDATION")
    .build(),
  USER_ID_EXIST: errorBuilder
    .create()
    .reason("USER_ID_EXIST")
    .key("USER_ID_VALIDATION")
    .build(),
  USER_ID_INVALID: errorBuilder
    .create()
    .reason("USER_ID_INVALID")
    .key("USER_ID_VALIDATION")
    .build(),
  USER_ID_INVALID_TYPE: errorBuilder
    .create()
    .reason("USER_ID_INVALID_TYPE")
    .key("USER_ID_VALIDATION")
    .build(),
  USER_ID_MAX_LENGTH_REACH: errorBuilder
    .create()
    .reason("USER_ID_MAX_LENGTH_REACH")
    .key("USER_ID_VALIDATION")
    .build(),
  USER_ID_MIN_LENGTH_REACH: errorBuilder
    .create()
    .reason("USER_ID_MIN_LENGTH_REACH")
    .key("USER_ID_VALIDATION")
    .build(),
  USER_ID_REQUIRED: errorBuilder
    .create()
    .reason("USER_ID_REQUIRED")
    .key("USER_ID_VALIDATION")
    .build(),
  USER_NO_LONGER_PARTICIPANT: errorBuilder
    .create()
    .reason("USER_NO_LONGER_PARTICIPANT")
    .key("USER_VALIDATION")
    .build(),
  USERNAME_EMPTY: errorBuilder
    .create()
    .reason("USERNAME_EMPTY")
    .key("USERNAME_VALIDATION")
    .build(),
  USERNAME_EXIST: errorBuilder
    .create()
    .reason("USERNAME_EXIST")
    .key("USERNAME_VALIDATION")
    .build(),
  USERNAME_INVALID: errorBuilder
    .create()
    .reason("USERNAME_INVALID")
    .key("USERNAME_VALIDATION")
    .build(),
  USERNAME_INVALID_TYPE: errorBuilder
    .create()
    .reason("USERNAME_INVALID_TYPE")
    .key("USERNAME_VALIDATION")
    .build(),
  USERNAME_MAX_LENGTH_REACH: errorBuilder
    .create()
    .reason("USERNAME_MAX_LENGTH_REACH")
    .key("USERNAME_VALIDATION")
    .build(),
  USERNAME_MIN_LENGTH_REACH: errorBuilder
    .create()
    .reason("USERNAME_MIN_LENGTH_REACH")
    .key("USERNAME_VALIDATION")
    .build(),
  USERNAME_REQUIRED: errorBuilder
    .create()
    .reason("USERNAME_REQUIRED")
    .key("USERNAME_VALIDATION")
    .build(),
  VERIFICATION_CODE_EMPTY: errorBuilder
    .create()
    .reason("VERIFICATION_CODE_EMPTY")
    .key("VERIFICATION_CODE_VALIDATION")
    .build(),
  VERIFICATION_CODE_INVALID: errorBuilder
    .create()
    .reason("VERIFICATION_CODE_INVALID")
    .key("VERIFICATION_CODE_VALIDATION")
    .build(),
  VERIFICATION_CODE_INVALID_LENGTH: errorBuilder
    .create()
    .reason("VERIFICATION_CODE_INVALID_LENGTH")
    .key("VERIFICATION_CODE_VALIDATION")
    .build(),
  VERIFICATION_CODE_INVALID_TYPE: errorBuilder
    .create()
    .reason("VERIFICATION_CODE_INVALID_TYPE")
    .key("VERIFICATION_CODE_VALIDATION")
    .build(),
  VERIFICATION_CODE_MAX_LENGTH_REACH: errorBuilder
    .create()
    .reason("VERIFICATION_CODE_MAX_LENGTH_REACH")
    .key("VERIFICATION_CODE_VALIDATION")
    .build(),
  VERIFICATION_CODE_NUMERIC: errorBuilder
    .create()
    .reason("VERIFICATION_CODE_NUMERIC")
    .key("VERIFICATION_CODE_VALIDATION")
    .build(),
  VERIFICATION_CODE_REQUIRED: errorBuilder
    .create()
    .reason("VERIFICATION_CODE_REQUIRED")
    .key("VERIFICATION_CODE_VALIDATION")
    .build(),
};

const requiredFieldErrors = {
  schemaInvalid: ERRORS.REQUIRED_FIELD_INVALID,
  schemaInvalidType: ERRORS.REQUIRED_FIELD_INVALID_TYPE,
  schemaNotDefined: ERRORS.REQUIRED_FIELDS_NOT_DEFINED,
};

const checkFieldErrors = {
  input: {
    ...requiredFieldErrors,
    dataFieldInvalidType: ERRORS.INPUT_FIELD_INVALID_TYPE,
    dataFieldsMissing: ERRORS.INPUT_FIELDS_MISSING,
    dataFieldsOverload: ERRORS.INPUT_FIELDS_OVERLOAD,
    dataNotDefined: ERRORS.INPUT_DATA_NOT_DEFINED,
  },
  output: {
    ...requiredFieldErrors,
    dataFieldInvalidType: ERRORS.OUTPUT_FIELD_INVALID_TYPE,
    dataFieldsMissing: ERRORS.OUTPUT_FIELDS_MISSING,
    dataFieldsOverload: ERRORS.OUTPUT_FIELDS_OVERLOAD,
    dataNotDefined: ERRORS.OUTPUT_DATA_NOT_DEFINED,
  },
};

const localErrors = {
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

export { ERRORS, checkFieldErrors, localErrors };
