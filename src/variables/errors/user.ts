import { errorBuilder } from "@/classes/ErrorBuilder";

import { ERROR_KEYS } from "@/variables/errors/keys";

const userErrors = {
  BIO_EMPTY: errorBuilder
    .create()
    .reason("BIO_EMPTY")
    .key(ERROR_KEYS.BIO_VALIDATION)
    .build(),
  BIO_INVALID: errorBuilder
    .create()
    .reason("BIO_INVALID")
    .key(ERROR_KEYS.BIO_VALIDATION)
    .build(),
  BIO_INVALID_TYPE: errorBuilder
    .create()
    .reason("BIO_INVALID_TYPE")
    .key(ERROR_KEYS.BIO_VALIDATION)
    .build(),
  BIO_MAXLENGTH_REACH: errorBuilder
    .create()
    .reason("BIO_MAXLENGTH_REACH")
    .key(ERROR_KEYS.BIO_VALIDATION)
    .build(),
  BIO_MINLENGTH_REACH: errorBuilder
    .create()
    .reason("BIO_MINLENGTH_REACH")
    .key(ERROR_KEYS.BIO_VALIDATION)
    .build(),
  BIO_REQUIRED: errorBuilder
    .create()
    .reason("BIO_REQUIRED")
    .key(ERROR_KEYS.BIO_VALIDATION)
    .build(),
  BLACKLIST_INVALID_TYPE: errorBuilder
    .create()
    .reason("BLACKLIST_INVALID_TYPE")
    .key(ERROR_KEYS.BLACKLIST_VALIDATION)
    .build(),
  BLACKLIST_ITEM_EXIST: errorBuilder
    .create()
    .reason("BLACKLIST_ITEM_EXIST")
    .key(ERROR_KEYS.BLACKLIST_VALIDATION)
    .build(),
  BLACKLIST_ITEM_NOT_EXIST: errorBuilder
    .create()
    .reason("BLACKLIST_ITEM_NOT_EXIST")
    .key(ERROR_KEYS.BLACKLIST_VALIDATION)
    .build(),
  BLACKLIST_REQUIRED: errorBuilder
    .create()
    .reason("BLACKLIST_REQUIRED")
    .key(ERROR_KEYS.BLACKLIST_VALIDATION)
    .build(),
  CHAT_EXIST: errorBuilder
    .create()
    .reason("CHAT_EXIST")
    .key(ERROR_KEYS.CHAT_VALIDATION)
    .build(),
  CHAT_ID_EMPTY: errorBuilder
    .create()
    .reason("CHAT_ID_EMPTY")
    .key(ERROR_KEYS.CHAT_ID_VALIDATION)
    .build(),
  CHAT_ID_EXIST: errorBuilder
    .create()
    .reason("CHAT_ID_EXIST")
    .key(ERROR_KEYS.CHAT_ID_VALIDATION)
    .build(),
  CHAT_ID_INVALID: errorBuilder
    .create()
    .reason("CHAT_ID_INVALID")
    .key(ERROR_KEYS.CHAT_ID_VALIDATION)
    .build(),
  CHAT_ID_INVALID_TYPE: errorBuilder
    .create()
    .reason("CHAT_ID_INVALID_TYPE")
    .key(ERROR_KEYS.CHAT_ID_VALIDATION)
    .build(),
  CHAT_ID_MAX_LENGTH_REACH: errorBuilder
    .create()
    .reason("CHAT_ID_MAX_LENGTH_REACH")
    .key(ERROR_KEYS.CHAT_ID_VALIDATION)
    .build(),
  CHAT_ID_MIN_LENGTH_REACH: errorBuilder
    .create()
    .reason("CHAT_ID_MIN_LENGTH_REACH")
    .key(ERROR_KEYS.CHAT_ID_VALIDATION)
    .build(),
  CHAT_ID_REQUIRED: errorBuilder
    .create()
    .reason("CHAT_ID_REQUIRED")
    .key(ERROR_KEYS.CHAT_ID_VALIDATION)
    .build(),
  CHAT_NOT_EXIST: errorBuilder
    .create()
    .reason("CHAT_NOT_EXIST")
    .key(ERROR_KEYS.CHAT_VALIDATION)
    .build(),
  CHATS_INVALID_TYPE: errorBuilder
    .create()
    .reason("CHATS_INVALID_TYPE")
    .key(ERROR_KEYS.CHATS_VALIDATION)
    .build(),
  CLIENT_ID_INVALID_TYPE: errorBuilder
    .create()
    .reason("CLIENT_ID_INVALID_TYPE")
    .key(ERROR_KEYS.CLIENT_ID_VALIDATION)
    .build(),
  CLIENT_ID_MAX_LENGTH_REACH: errorBuilder
    .create()
    .reason("CLIENT_ID_MAX_LENGTH_REACH")
    .key(ERROR_KEYS.CLIENT_ID_VALIDATION)
    .build(),
  CLIENT_ID_MIN_LENGTH_REACH: errorBuilder
    .create()
    .reason("CLIENT_ID_MIN_LENGTH_REACH")
    .key(ERROR_KEYS.CLIENT_ID_VALIDATION)
    .build(),
  CLIENT_ID_NOT_DEFINED: errorBuilder
    .create()
    .reason("CLIENT_ID_NOT_DEFINED")
    .key(ERROR_KEYS.CLIENT_ID_VALIDATION)
    .build(),
  CLIENT_ID_REQUIRED: errorBuilder
    .create()
    .reason("CLIENT_ID_REQUIRED")
    .key(ERROR_KEYS.CLIENT_ID_VALIDATION)
    .build(),
  CLIENT_NOT_FOUND: errorBuilder
    .create()
    .authError()
    .reason("CLIENT_NOT_FOUND")
    .key(ERROR_KEYS.CLIENT_VALIDATION)
    .build(),
  CLIENT_NOT_VERIFIED: errorBuilder
    .create()
    .authError()
    .reason("CLIENT_NOT_VERIFIED")
    .key(ERROR_KEYS.CLIENT_VALIDATION)
    .build(),
  CONTACT_INVALID_TYPE: errorBuilder
    .create()
    .reason("CONTACT_INVALID_TYPE")
    .key(ERROR_KEYS.CONTACT_VALIDATION)
    .build(),
  CONTACT_ITEM_EXIST: errorBuilder
    .create()
    .reason("CONTACT_ITEM_EXIST")
    .key(ERROR_KEYS.CONTACT_VALIDATION)
    .build(),
  CONTACT_ITEM_NOT_EXIST: errorBuilder
    .create()
    .reason("CONTACT_ITEM_NOT_EXIST")
    .key(ERROR_KEYS.CONTACT_VALIDATION)
    .build(),
  CONTACTS_INVALID_TYPE: errorBuilder
    .create()
    .reason("CONTACTS_INVALID_TYPE")
    .key(ERROR_KEYS.CONTACT_VALIDATION)
    .build(),
  CONTACTS_REQUIRED: errorBuilder
    .create()
    .reason("CONTACTS_REQUIRED")
    .key(ERROR_KEYS.CONTACT_VALIDATION)
    .build(),
  COOKIE_IS_UNDEFINED: errorBuilder
    .create()
    .reason("COOKIE_IS_UNDEFINED")
    .side("client")
    .authError()
    .key(ERROR_KEYS.SESSION_VALIDATION)
    .build(),
  COUNTRY_CODE_EMPTY: errorBuilder
    .create()
    .reason("COUNTRY_CODE_EMPTY")
    .key(ERROR_KEYS.COUNTRY_CODE_VALIDATION)
    .build(),
  COUNTRY_CODE_INVALID: errorBuilder
    .create()
    .reason("COUNTRY_CODE_INVALID")
    .key(ERROR_KEYS.COUNTRY_CODE_VALIDATION)
    .build(),
  COUNTRY_CODE_INVALID_TYPE: errorBuilder
    .create()
    .reason("COUNTRY_CODE_INVALID_TYPE")
    .key(ERROR_KEYS.COUNTRY_CODE_VALIDATION)
    .build(),
  COUNTRY_CODE_MAXLENGTH_REACH: errorBuilder
    .create()
    .reason("COUNTRY_CODE_MAXLENGTH_REACH")
    .key(ERROR_KEYS.COUNTRY_CODE_VALIDATION)
    .build(),
  COUNTRY_CODE_MINLENGTH_REACH: errorBuilder
    .create()
    .reason("COUNTRY_CODE_MINLENGTH_REACH")
    .key(ERROR_KEYS.COUNTRY_CODE_VALIDATION)
    .build(),
  COUNTRY_CODE_NOT_SUPPORTED: errorBuilder
    .create()
    .reason("COUNTRY_CODE_NOT_SUPPORTED")
    .key(ERROR_KEYS.COUNTRY_CODE_VALIDATION)
    .build(),
  COUNTRY_CODE_NUMERIC: errorBuilder
    .create()
    .reason("COUNTRY_CODE_NUMERIC")
    .key(ERROR_KEYS.COUNTRY_CODE_VALIDATION)
    .build(),
  COUNTRY_CODE_REQUIRED: errorBuilder
    .create()
    .reason("COUNTRY_CODE_REQUIRED")
    .key(ERROR_KEYS.COUNTRY_CODE_VALIDATION)
    .build(),
  COUNTRY_NAME_EMPTY: errorBuilder
    .create()
    .reason("COUNTRY_NAME_EMPTY")
    .key(ERROR_KEYS.COUNTRY_NAME_VALIDATION)
    .build(),
  COUNTRY_NAME_INVALID: errorBuilder
    .create()
    .reason("COUNTRY_NAME_INVALID")
    .key(ERROR_KEYS.COUNTRY_NAME_VALIDATION)
    .build(),
  COUNTRY_NAME_INVALID_TYPE: errorBuilder
    .create()
    .reason("COUNTRY_NAME_INVALID_TYPE")
    .key(ERROR_KEYS.COUNTRY_NAME_VALIDATION)
    .build(),
  COUNTRY_NAME_MAXLENGTH_REACH: errorBuilder
    .create()
    .reason("COUNTRY_NAME_MAXLENGTH_REACH")
    .key(ERROR_KEYS.COUNTRY_NAME_VALIDATION)
    .build(),
  COUNTRY_NAME_MINLENGTH_REACH: errorBuilder
    .create()
    .reason("COUNTRY_NAME_MINLENGTH_REACH")
    .key(ERROR_KEYS.COUNTRY_NAME_VALIDATION)
    .build(),
  COUNTRY_NAME_NOT_SUPPORTED: errorBuilder
    .create()
    .reason("COUNTRY_NAME_NOT_SUPPORTED")
    .key(ERROR_KEYS.COUNTRY_NAME_VALIDATION)
    .build(),
  COUNTRY_NAME_REQUIRED: errorBuilder
    .create()
    .reason("COUNTRY_NAME_REQUIRED")
    .key(ERROR_KEYS.COUNTRY_NAME_VALIDATION)
    .build(),
  COUNTRY_NOT_SUPPORTED: errorBuilder
    .create()
    .reason("COUNTRY_NOT_SUPPORTED")
    .key(ERROR_KEYS.COUNTRY_NOT_SUPPORTED_VALIDATION)
    .build(),
  CREATED_AT_EMPTY: errorBuilder
    .create()
    .reason("CREATED_AT_EMPTY")
    .key(ERROR_KEYS.CREATED_AT_VALIDATION)
    .build(),
  CREATED_AT_INVALID_TYPE: errorBuilder
    .create()
    .reason("CREATED_AT_INVALID_TYPE")
    .key(ERROR_KEYS.CREATED_AT_VALIDATION)
    .build(),
  CREATED_AT_REQUIRED: errorBuilder
    .create()
    .reason("CREATED_AT_REQUIRED")
    .key(ERROR_KEYS.CREATED_AT_VALIDATION)
    .build(),
  CURRENT_SESSION_NOT_EXIST: errorBuilder
    .create()
    .reason("CURRENT_SESSION_NOT_EXIST")
    .key(ERROR_KEYS.USER_VALIDATION)
    .build(),
  CURRENT_USER_EXIST: errorBuilder
    .create()
    .authError()
    .reason("CURRENT_USER_EXIST")
    .key(ERROR_KEYS.USER_VALIDATION)
    .build(),
  CURRENT_USER_NOT_EXIST: errorBuilder
    .create()
    .authError()
    .reason("CURRENT_USER_NOT_EXIST")
    .key(ERROR_KEYS.USER_VALIDATION)
    .build(),
  EVENT_NOT_FOUND: errorBuilder
    .create()
    .key(ERROR_KEYS.UNKNOWN_EVENT)
    .reason("EVENT_NOT_FOUND")
    .build(),
  FIRST_NAME_EMPTY: errorBuilder
    .create()
    .reason("FIRST_NAME_EMPTY")
    .key(ERROR_KEYS.FIRST_NAME_VALIDATION)
    .build(),
  FIRST_NAME_INVALID: errorBuilder
    .create()
    .reason("FIRST_NAME_INVALID")
    .key(ERROR_KEYS.FIRST_NAME_VALIDATION)
    .build(),
  FIRST_NAME_INVALID_TYPE: errorBuilder
    .create()
    .reason("FIRST_NAME_INVALID_TYPE")
    .key(ERROR_KEYS.FIRST_NAME_VALIDATION)
    .build(),
  FIRST_NAME_MAXLENGTH_REACH: errorBuilder
    .create()
    .reason("FIRST_NAME_MAXLENGTH_REACH")
    .key(ERROR_KEYS.FIRST_NAME_VALIDATION)
    .build(),
  FIRST_NAME_MINLENGTH_REACH: errorBuilder
    .create()
    .reason("FIRST_NAME_MINLENGTH_REACH")
    .key(ERROR_KEYS.FIRST_NAME_VALIDATION)
    .build(),
  FIRST_NAME_REQUIRED: errorBuilder
    .create()
    .reason("FIRST_NAME_REQUIRED")
    .key(ERROR_KEYS.FIRST_NAME_VALIDATION)
    .build(),
  FULL_NAME_INVALID: errorBuilder
    .create()
    .reason("FULL_NAME_INVALID")
    .key(ERROR_KEYS.FULL_NAME_VALIDATION)
    .build(),
  INPUT_DATA_NOT_DEFINED: errorBuilder
    .create()
    .key(ERROR_KEYS.INPUT_OUTPUT_FIELDS)
    .reason("INPUT_DATA_NOT_DEFINED")
    .build(),
  INPUT_FIELD_INVALID_TYPE: errorBuilder
    .create()
    .key(ERROR_KEYS.INPUT_OUTPUT_FIELDS)
    .reason("INPUT_FIELD_INVALID_TYPE")
    .build(),
  INPUT_FIELDS_MISSING: errorBuilder
    .create()
    .key(ERROR_KEYS.INPUT_OUTPUT_FIELDS)
    .reason("INPUT_FIELDS_MISSING")
    .build(),
  INPUT_FIELDS_OVERLOAD: errorBuilder
    .create()
    .key(ERROR_KEYS.INPUT_OUTPUT_FIELDS)
    .reason("INPUT_FIELDS_OVERLOAD")
    .build(),
  IS_NOT_A_CALLBACK: errorBuilder
    .create()
    .key(ERROR_KEYS.SOCKET_ARGS_VALIDATION)
    .reason("IS_NOT_A_CALLBACK")
    .build(),
  LAST_NAME_EMPTY: errorBuilder
    .create()
    .reason("LAST_NAME_EMPTY")
    .key(ERROR_KEYS.LAST_NAME_VALIDATION)
    .build(),
  LAST_NAME_INVALID: errorBuilder
    .create()
    .reason("LAST_NAME_INVALID")
    .key(ERROR_KEYS.LAST_NAME_VALIDATION)
    .build(),
  LAST_NAME_INVALID_TYPE: errorBuilder
    .create()
    .reason("LAST_NAME_INVALID_TYPE")
    .key(ERROR_KEYS.LAST_NAME_VALIDATION)
    .build(),
  LAST_NAME_MAXLENGTH_REACH: errorBuilder
    .create()
    .reason("LAST_NAME_MAXLENGTH_REACH")
    .key(ERROR_KEYS.LAST_NAME_VALIDATION)
    .build(),
  LAST_NAME_MINLENGTH_REACH: errorBuilder
    .create()
    .reason("LAST_NAME_MINLENGTH_REACH")
    .key(ERROR_KEYS.LAST_NAME_VALIDATION)
    .build(),
  LAST_NAME_REQUIRED: errorBuilder
    .create()
    .reason("LAST_NAME_REQUIRED")
    .key(ERROR_KEYS.LAST_NAME_VALIDATION)
    .build(),
  MAC_ADDRESS_EMPTY: errorBuilder
    .create()
    .reason("MAC_ADDRESS_EMPTY")
    .key(ERROR_KEYS.MAC_ADDRESS_VALIDATION)
    .build(),
  MAC_ADDRESS_EXIST: errorBuilder
    .create()
    .reason("MAC_ADDRESS_EXIST")
    .key(ERROR_KEYS.MAC_ADDRESS_VALIDATION)
    .build(),
  MAC_ADDRESS_INVALID_TYPE: errorBuilder
    .create()
    .reason("MAC_ADDRESS_INVALID_TYPE")
    .key(ERROR_KEYS.MAC_ADDRESS_VALIDATION)
    .build(),
  MAC_ADDRESS_MAXLENGTH_REACH: errorBuilder
    .create()
    .reason("MAC_ADDRESS_MAXLENGTH_REACH")
    .key(ERROR_KEYS.MAC_ADDRESS_VALIDATION)
    .build(),
  MAC_ADDRESS_MINLENGTH_REACH: errorBuilder
    .create()
    .reason("MAC_ADDRESS_MINLENGTH_REACH")
    .key(ERROR_KEYS.MAC_ADDRESS_VALIDATION)
    .build(),
  MAC_ADDRESS_REQUIRED: errorBuilder
    .create()
    .reason("MAC_ADDRESS_REQUIRED")
    .key(ERROR_KEYS.MAC_ADDRESS_VALIDATION)
    .build(),
  MESSAGE_ID_EMPTY: errorBuilder
    .create()
    .reason("MESSAGE_ID_EMPTY")
    .key(ERROR_KEYS.MESSAGE_ID_VALIDATION)
    .build(),
  MESSAGE_ID_EXIST: errorBuilder
    .create()
    .reason("MESSAGE_ID_EXIST")
    .key(ERROR_KEYS.MESSAGE_ID_VALIDATION)
    .build(),
  MESSAGE_ID_INVALID_TYPE: errorBuilder
    .create()
    .reason("MESSAGE_ID_INVALID_TYPE")
    .key(ERROR_KEYS.MESSAGE_ID_VALIDATION)
    .build(),
  MESSAGE_ID_MAX_LENGTH_REACH: errorBuilder
    .create()
    .reason("MESSAGE_ID_MAX_LENGTH_REACH")
    .key(ERROR_KEYS.MESSAGE_ID_VALIDATION)
    .build(),
  MESSAGE_ID_MIN_LENGTH_REACH: errorBuilder
    .create()
    .reason("MESSAGE_ID_MIN_LENGTH_REACH")
    .key(ERROR_KEYS.MESSAGE_ID_VALIDATION)
    .build(),
  MESSAGE_ID_REQUIRED: errorBuilder
    .create()
    .reason("MESSAGE_ID_REQUIRED")
    .key(ERROR_KEYS.MESSAGE_ID_VALIDATION)
    .build(),
  MESSAGE_TEXT_EMPTY: errorBuilder
    .create()
    .reason("MESSAGE_TEXT_EMPTY")
    .key(ERROR_KEYS.MESSAGE_TEXT_VALIDATION)
    .build(),
  MESSAGE_TEXT_INVALID: errorBuilder
    .create()
    .reason("MESSAGE_TEXT_INVALID")
    .key(ERROR_KEYS.MESSAGE_TEXT_VALIDATION)
    .build(),
  MESSAGE_TEXT_INVALID_TYPE: errorBuilder
    .create()
    .reason("MESSAGE_TEXT_INVALID_TYPE")
    .key(ERROR_KEYS.MESSAGE_TEXT_VALIDATION)
    .build(),
  MESSAGE_TEXT_MAX_LENGTH_REACH: errorBuilder
    .create()
    .reason("MESSAGE_TEXT_MAX_LENGTH_REACH")
    .key(ERROR_KEYS.MESSAGE_TEXT_VALIDATION)
    .build(),
  MESSAGE_TEXT_MIN_LENGTH_REACH: errorBuilder
    .create()
    .reason("MESSAGE_TEXT_MIN_LENGTH_REACH")
    .key(ERROR_KEYS.MESSAGE_TEXT_VALIDATION)
    .build(),
  MESSAGE_TEXT_REQUIRED: errorBuilder
    .create()
    .reason("MESSAGE_TEXT_REQUIRED")
    .key(ERROR_KEYS.MESSAGE_TEXT_VALIDATION)
    .build(),
  MESSAGES_INVALID_TYPE: errorBuilder
    .create()
    .reason("MESSAGES_INVALID_TYPE")
    .key(ERROR_KEYS.MESSAGES_VALIDATION)
    .build(),
  MESSAGES_REQUIRED: errorBuilder
    .create()
    .reason("MESSAGES_REQUIRED")
    .key(ERROR_KEYS.MESSAGES_VALIDATION)
    .build(),
  ONLINE_INVALID_TYPE: errorBuilder
    .create()
    .reason("ONLINE_INVALID_TYPE")
    .key(ERROR_KEYS.ONLINE_VALIDATION)
    .build(),
  ONLINE_REQUIRED: errorBuilder
    .create()
    .reason("ONLINE_REQUIRED")
    .key(ERROR_KEYS.ONLINE_VALIDATION)
    .build(),
  OUTPUT_DATA_NOT_DEFINED: errorBuilder
    .create()
    .reason("OUTPUT_DATA_NOT_DEFINED")
    .key(ERROR_KEYS.ONLINE_VALIDATION)
    .build(),
  PARTICIPANT_EMPTY: errorBuilder
    .create()
    .reason("PARTICIPANT_EMPTY")
    .key(ERROR_KEYS.PARTICIPANT_VALIDATION)
    .build(),
  PARTICIPANT_ID_EMPTY: errorBuilder
    .create()
    .reason("PARTICIPANT_ID_EMPTY")
    .key(ERROR_KEYS.PARTICIPANT_ID_VALIDATION)
    .build(),
  PARTICIPANT_ID_EXIST: errorBuilder
    .create()
    .reason("PARTICIPANT_ID_EXIST")
    .key(ERROR_KEYS.PARTICIPANT_ID_VALIDATION)
    .build(),
  PARTICIPANT_ID_INVALID: errorBuilder
    .create()
    .reason("PARTICIPANT_ID_INVALID")
    .key(ERROR_KEYS.PARTICIPANT_ID_VALIDATION)
    .build(),
  PARTICIPANT_ID_INVALID_TYPE: errorBuilder
    .create()
    .reason("PARTICIPANT_ID_INVALID_TYPE")
    .key(ERROR_KEYS.PARTICIPANT_ID_VALIDATION)
    .build(),
  PARTICIPANT_ID_MAX_LENGTH_REACH: errorBuilder
    .create()
    .reason("PARTICIPANT_ID_MAX_LENGTH_REACH")
    .key(ERROR_KEYS.PARTICIPANT_ID_VALIDATION)
    .build(),
  PARTICIPANT_ID_MIN_LENGTH_REACH: errorBuilder
    .create()
    .reason("PARTICIPANT_ID_MIN_LENGTH_REACH")
    .key(ERROR_KEYS.PARTICIPANT_ID_VALIDATION)
    .build(),
  PARTICIPANT_ID_REQUIRED: errorBuilder
    .create()
    .reason("PARTICIPANT_ID_REQUIRED")
    .key(ERROR_KEYS.PARTICIPANT_ID_VALIDATION)
    .build(),
  PARTICIPANT_NOT_EXIST: errorBuilder
    .create()
    .reason("PARTICIPANT_NOT_EXIST")
    .key(ERROR_KEYS.PARTICIPANT_ID_VALIDATION)
    .build(),
  PARTICIPANTS_EMPTY: errorBuilder
    .create()
    .reason("PARTICIPANT_EMPTY")
    .key(ERROR_KEYS.PARTICIPANTS_VALIDATION)
    .build(),
  PARTICIPANTS_INVALID_LENGTH: errorBuilder
    .create()
    .reason("PARTICIPANTS_INVALID_LENGTH")
    .key(ERROR_KEYS.PARTICIPANTS_VALIDATION)
    .build(),
  PARTICIPANTS_INVALID_TYPE: errorBuilder
    .create()
    .reason("PARTICIPANTS_INVALID_TYPE")
    .key(ERROR_KEYS.PARTICIPANTS_VALIDATION)
    .build(),
  PARTICIPANTS_REQUIRED: errorBuilder
    .create()
    .reason("PARTICIPANTS_REQUIRED")
    .key(ERROR_KEYS.PARTICIPANTS_VALIDATION)
    .build(),
  PHONE_NUMBER_EMPTY: errorBuilder
    .create()
    .reason("PHONE_NUMBER_EMPTY")
    .key(ERROR_KEYS.PHONE_NUMBER_VALIDATION)
    .build(),
  PHONE_NUMBER_EXIST: errorBuilder
    .create()
    .reason("PHONE_NUMBER_EXIST")
    .key(ERROR_KEYS.PHONE_NUMBER_VALIDATION)
    .build(),
  PHONE_NUMBER_INVALID: errorBuilder
    .create()
    .reason("PHONE_NUMBER_INVALID")
    .key(ERROR_KEYS.PHONE_NUMBER_VALIDATION)
    .build(),
  PHONE_NUMBER_INVALID_TYPE: errorBuilder
    .create()
    .reason("PHONE_NUMBER_INVALID_TYPE")
    .key(ERROR_KEYS.PHONE_NUMBER_VALIDATION)
    .build(),
  PHONE_NUMBER_MAXLENGTH_REACH: errorBuilder
    .create()
    .reason("PHONE_NUMBER_MAXLENGTH_REACH")
    .key(ERROR_KEYS.PHONE_NUMBER_VALIDATION)
    .build(),
  PHONE_NUMBER_MINLENGTH_REACH: errorBuilder
    .create()
    .reason("PHONE_NUMBER_MINLENGTH_REACH")
    .key(ERROR_KEYS.PHONE_NUMBER_VALIDATION)
    .build(),
  PHONE_NUMBER_NUMERIC: errorBuilder
    .create()
    .reason("PHONE_NUMBER_NUMERIC")
    .key(ERROR_KEYS.PHONE_NUMBER_VALIDATION)
    .build(),
  PHONE_NUMBER_REQUIRED: errorBuilder
    .create()
    .reason("PHONE_NUMBER_REQUIRED")
    .key(ERROR_KEYS.PHONE_NUMBER_VALIDATION)
    .build(),
  PRIVATE_CHATS_INVALID_TYPE: errorBuilder
    .create()
    .reason("PRIVATE_CHATS_INVALID_TYPE")
    .key(ERROR_KEYS.PRIVATE_CHAT_VALIDATION)
    .build(),
  ROUTE_NOT_FOUND: errorBuilder
    .create()
    .key(ERROR_KEYS.UNKNOWN_ROUTE)
    .reason("ROUTE_NOT_FOUND")
    .build(),
  SELF_STUFF: errorBuilder
    .create()
    .reason("SELF_STUFF")
    .key(ERROR_KEYS.SELF_STUFF_VALIDATION)
    .build(),
  SENDER_EMPTY: errorBuilder
    .create()
    .reason("SENDER_EMPTY")
    .key(ERROR_KEYS.SENDER_ID_VALIDATION)
    .build(),
  SENDER_ID_EXIST: errorBuilder
    .create()
    .reason("SENDER_ID_EXIST")
    .key(ERROR_KEYS.SENDER_ID_VALIDATION)
    .build(),
  SENDER_ID_INVALID_TYPE: errorBuilder
    .create()
    .reason("SENDER_ID_INVALID_TYPE")
    .key(ERROR_KEYS.SENDER_ID_VALIDATION)
    .build(),
  SENDER_ID_MAX_LENGTH_REACH: errorBuilder
    .create()
    .reason("SENDER_ID_MAX_LENGTH_REACH")
    .key(ERROR_KEYS.SENDER_ID_VALIDATION)
    .build(),
  SENDER_ID_MIN_LENGTH_REACH: errorBuilder
    .create()
    .reason("SENDER_ID_MIN_LENGTH_REACH")
    .key(ERROR_KEYS.SENDER_ID_VALIDATION)
    .build(),
  SENDER_ID_REQUIRED: errorBuilder
    .create()
    .reason("SENDER_ID_REQUIRED")
    .key(ERROR_KEYS.SENDER_ID_VALIDATION)
    .build(),
  SESSION_CAN_NOT_VERIFIED: errorBuilder
    .create()
    .authError()
    .reason("SESSION_CAN_NOT_VERIFIED")
    .key(ERROR_KEYS.SESSION_VALIDATION)
    .build(),
  SESSION_EMPTY: errorBuilder
    .create()
    .authError()
    .reason("SESSION_INVALID")
    .key(ERROR_KEYS.SESSION_VALIDATION)
    .build(),
  SESSION_EXIST: errorBuilder
    .create()
    .reason("SESSION_EXIST")
    .key(ERROR_KEYS.SESSION_VALIDATION)
    .build(),
  SESSION_INVALID: errorBuilder
    .create()
    .authError()
    .reason("SESSION_INVALID")
    .key(ERROR_KEYS.SESSION_VALIDATION)
    .build(),
  SESSION_INVALID_TYPE: errorBuilder
    .create()
    .authError()
    .reason("SESSION_INVALID_TYPE")
    .key(ERROR_KEYS.SESSION_VALIDATION)
    .build(),
  SESSION_MAXLENGTH_REACH: errorBuilder
    .create()
    .authError()
    .reason("SESSION_MAXLENGTH_REACH")
    .key(ERROR_KEYS.SESSION_VALIDATION)
    .build(),
  SESSION_MINLENGTH_REACH: errorBuilder
    .create()
    .authError()
    .reason("SESSION_MINLENGTH_REACH")
    .key(ERROR_KEYS.SESSION_VALIDATION)
    .build(),
  SESSION_REQUIRED: errorBuilder
    .create()
    .authError()
    .reason("SESSION_REQUIRED")
    .key(ERROR_KEYS.SESSION_VALIDATION)
    .build(),
  SESSIONS_INVALID_TYPE: errorBuilder
    .create()
    .reason("SESSIONS_INVALID_TYPE")
    .key(ERROR_KEYS.SESSIONS_VALIDATION)
    .build(),
  SESSIONS_REQUIRED: errorBuilder
    .create()
    .reason("SESSIONS_REQUIRED")
    .key(ERROR_KEYS.SESSIONS_VALIDATION)
    .build(),
  STATUS_INVALID_TYPE: errorBuilder
    .create()
    .reason("STATUS_INVALID_TYPE")
    .key(ERROR_KEYS.STATUS_VALIDATION)
    .build(),
  STATUS_REQUIRED: errorBuilder
    .create()
    .reason("STATUS_REQUIRED")
    .key(ERROR_KEYS.STATUS_VALIDATION)
    .build(),
  TARGET_USER_NOT_EXIST: errorBuilder
    .create()
    .reason("TARGET_USER_NOT_EXIST")
    .key(ERROR_KEYS.TARGET_USER_VALIDATION)
    .build(),
  USER_EXIST: errorBuilder
    .create()
    .reason("USER_EXIST")
    .key(ERROR_KEYS.USER_VALIDATION)
    .build(),
  USER_ID_EMPTY: errorBuilder
    .create()
    .reason("USER_ID_EMPTY")
    .key(ERROR_KEYS.USER_ID_VALIDATION)
    .build(),
  USER_ID_EXIST: errorBuilder
    .create()
    .reason("USER_ID_EXIST")
    .key(ERROR_KEYS.USER_ID_VALIDATION)
    .build(),
  USER_ID_INVALID: errorBuilder
    .create()
    .reason("USER_ID_INVALID")
    .key(ERROR_KEYS.USER_ID_VALIDATION)
    .build(),
  USER_ID_INVALID_TYPE: errorBuilder
    .create()
    .reason("USER_ID_INVALID_TYPE")
    .key(ERROR_KEYS.USER_ID_VALIDATION)
    .build(),
  USER_ID_MAX_LENGTH_REACH: errorBuilder
    .create()
    .reason("USER_ID_MAX_LENGTH_REACH")
    .key(ERROR_KEYS.USER_ID_VALIDATION)
    .build(),
  USER_ID_MIN_LENGTH_REACH: errorBuilder
    .create()
    .reason("USER_ID_MIN_LENGTH_REACH")
    .key(ERROR_KEYS.USER_ID_VALIDATION)
    .build(),
  USER_ID_REQUIRED: errorBuilder
    .create()
    .reason("USER_ID_REQUIRED")
    .key(ERROR_KEYS.USER_ID_VALIDATION)
    .build(),
  USER_NO_LONGER_PARTICIPANT: errorBuilder
    .create()
    .reason("USER_NO_LONGER_PARTICIPANT")
    .key(ERROR_KEYS.USER_VALIDATION)
    .build(),
  USERNAME_EMPTY: errorBuilder
    .create()
    .reason("USERNAME_EMPTY")
    .key(ERROR_KEYS.USERNAME_VALIDATION)
    .build(),
  USERNAME_EXIST: errorBuilder
    .create()
    .reason("USERNAME_EXIST")
    .key(ERROR_KEYS.USERNAME_VALIDATION)
    .build(),
  USERNAME_INVALID: errorBuilder
    .create()
    .reason("USERNAME_INVALID")
    .key(ERROR_KEYS.USERNAME_VALIDATION)
    .build(),
  USERNAME_INVALID_TYPE: errorBuilder
    .create()
    .reason("USERNAME_INVALID_TYPE")
    .key(ERROR_KEYS.USERNAME_VALIDATION)
    .build(),
  USERNAME_MAXLENGTH_REACH: errorBuilder
    .create()
    .reason("USERNAME_MAXLENGTH_REACH")
    .key(ERROR_KEYS.USERNAME_VALIDATION)
    .build(),
  USERNAME_MINLENGTH_REACH: errorBuilder
    .create()
    .reason("USERNAME_MINLENGTH_REACH")
    .key(ERROR_KEYS.USERNAME_VALIDATION)
    .build(),
  USERNAME_REQUIRED: errorBuilder
    .create()
    .reason("USERNAME_REQUIRED")
    .key(ERROR_KEYS.USERNAME_VALIDATION)
    .build(),
  VERIFICATION_CODE_EMPTY: errorBuilder
    .create()
    .reason("VERIFICATION_CODE_EMPTY")
    .key(ERROR_KEYS.VERIFICATION_CODE_VALIDATION)
    .build(),
  VERIFICATION_CODE_INVALID: errorBuilder
    .create()
    .reason("VERIFICATION_CODE_INVALID")
    .key(ERROR_KEYS.VERIFICATION_CODE_VALIDATION)
    .build(),
  VERIFICATION_CODE_INVALID_LENGTH: errorBuilder
    .create()
    .reason("VERIFICATION_CODE_INVALID_LENGTH")
    .key(ERROR_KEYS.VERIFICATION_CODE_VALIDATION)
    .build(),
  VERIFICATION_CODE_INVALID_TYPE: errorBuilder
    .create()
    .reason("VERIFICATION_CODE_INVALID_TYPE")
    .key(ERROR_KEYS.VERIFICATION_CODE_VALIDATION)
    .build(),
  VERIFICATION_CODE_MAXLENGTH_REACH: errorBuilder
    .create()
    .reason("VERIFICATION_CODE_MAXLENGTH_REACH")
    .key(ERROR_KEYS.VERIFICATION_CODE_VALIDATION)
    .build(),
  VERIFICATION_CODE_NUMERIC: errorBuilder
    .create()
    .reason("VERIFICATION_CODE_NUMERIC")
    .key(ERROR_KEYS.VERIFICATION_CODE_VALIDATION)
    .build(),
  VERIFICATION_CODE_REQUIRED: errorBuilder
    .create()
    .reason("VERIFICATION_CODE_REQUIRED")
    .key(ERROR_KEYS.VERIFICATION_CODE_VALIDATION)
    .build(),
};

export { userErrors };
