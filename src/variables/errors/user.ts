import { errorBuilder } from "@/classes/ErrorBuilder";

import { ERROR_KEYS } from "@/variables/errors/errorKeys";

const BIO_EMPTY = errorBuilder
  .create()
  .reason("BIO_EMPTY")
  .key(ERROR_KEYS.BIO_VALIDATION)
  .build();

const BIO_INVALID = errorBuilder
  .create()
  .reason("BIO_INVALID")
  .key(ERROR_KEYS.BIO_VALIDATION)
  .build();

const BIO_INVALID_TYPE = errorBuilder
  .create()
  .reason("BIO_INVALID_TYPE")
  .key(ERROR_KEYS.BIO_VALIDATION)
  .build();

const BIO_MAXLENGTH_REACH = errorBuilder
  .create()
  .reason("BIO_MAXLENGTH_REACH")
  .key(ERROR_KEYS.BIO_VALIDATION)
  .build();

const BIO_MINLENGTH_REACH = errorBuilder
  .create()
  .reason("BIO_MINLENGTH_REACH")
  .key(ERROR_KEYS.BIO_VALIDATION)
  .build();

const BIO_REQUIRED = errorBuilder
  .create()
  .reason("BIO_REQUIRED")
  .key(ERROR_KEYS.BIO_VALIDATION)
  .build();

const BLACKLIST_ITEM_EXIST = errorBuilder
  .create()
  .reason("BLACKLIST_ITEM_EXIST")
  .key(ERROR_KEYS.BLACKLIST_VALIDATION)
  .build();

const BLACKLIST_INVALID_TYPE = errorBuilder
  .create()
  .reason("BLACKLIST_INVALID_TYPE")
  .key(ERROR_KEYS.BLACKLIST_VALIDATION)
  .build();

const BLACKLIST_ITEM_NOT_EXIST = errorBuilder
  .create()
  .reason("BLACKLIST_ITEM_NOT_EXIST")
  .key(ERROR_KEYS.BLACKLIST_VALIDATION)
  .build();

const BLACKLIST_REQUIRED = errorBuilder
  .create()
  .reason("BLACKLIST_REQUIRED")
  .key(ERROR_KEYS.BLACKLIST_VALIDATION)
  .build();

const CELLPHONE_EXIST = errorBuilder
  .create()
  .reason("CELLPHONE_EXIST")
  .key(ERROR_KEYS.CELLPHONE_VALIDATION)
  .build();

const CELLPHONE_INVALID = errorBuilder
  .create()
  .reason("CELLPHONE_INVALID")
  .key(ERROR_KEYS.CELLPHONE_VALIDATION)
  .build();

const CELLPHONE_NOT_EXIST = errorBuilder
  .create()
  .reason("CELLPHONE_NOT_EXIST")
  .key(ERROR_KEYS.CELLPHONE_VALIDATION)
  .build();

const CELLPHONE_REQUIRED = errorBuilder
  .create()
  .reason("CELLPHONE_REQUIRED")
  .key(ERROR_KEYS.CELLPHONE_VALIDATION)
  .build();

const CELLPHONE_EXIST_IN_CONTACT = errorBuilder
  .create()
  .reason("CELLPHONE_EXIST_IN_CONTACT")
  .key(ERROR_KEYS.CELLPHONE_VALIDATION)
  .build();

const CHAT_EXIST = errorBuilder
  .create()
  .reason("CHAT_EXIST")
  .key(ERROR_KEYS.CHAT_VALIDATION)
  .build();

const CHAT_NOT_EXIST = errorBuilder
  .create()
  .reason("CHAT_NOT_EXIST")
  .key(ERROR_KEYS.CHAT_VALIDATION)
  .build();

const CHAT_ID_EMPTY = errorBuilder
  .create()
  .reason("CHAT_ID_EMPTY")
  .key(ERROR_KEYS.CHAT_ID_VALIDATION)
  .build();

const CHAT_ID_EXIST = errorBuilder
  .create()
  .reason("CHAT_ID_EXIST")
  .key(ERROR_KEYS.CHAT_ID_VALIDATION)
  .build();

const CHAT_ID_INVALID = errorBuilder
  .create()
  .reason("CHAT_ID_INVALID")
  .key(ERROR_KEYS.CHAT_ID_VALIDATION)
  .build();

const CHAT_ID_INVALID_TYPE = errorBuilder
  .create()
  .reason("CHAT_ID_INVALID_TYPE")
  .key(ERROR_KEYS.CHAT_ID_VALIDATION)
  .build();

const CHAT_ID_MAX_LENGTH_REACH = errorBuilder
  .create()
  .reason("CHAT_ID_MAX_LENGTH_REACH")
  .key(ERROR_KEYS.CHAT_ID_VALIDATION)
  .build();

const CHAT_ID_MIN_LENGTH_REACH = errorBuilder
  .create()
  .reason("CHAT_ID_MIN_LENGTH_REACH")
  .key(ERROR_KEYS.CHAT_ID_VALIDATION)
  .build();

const CHAT_ID_REQUIRED = errorBuilder
  .create()
  .reason("CHAT_ID_REQUIRED")
  .key(ERROR_KEYS.CHAT_ID_VALIDATION)
  .build();

const CHATS_INVALID_TYPE = errorBuilder
  .create()
  .reason("CHATS_INVALID_TYPE")
  .key(ERROR_KEYS.CHATS_VALIDATION)
  .build();

const CLIENT_ID_REQUIRED = errorBuilder
  .create()
  .reason("CLIENT_ID_REQUIRED")
  .key(ERROR_KEYS.CLIENT_ID_VALIDATION)
  .build();

const CLIENT_ID_INVALID_TYPE = errorBuilder
  .create()
  .reason("CLIENT_ID_INVALID_TYPE")
  .key(ERROR_KEYS.CLIENT_ID_VALIDATION)
  .build();

const CLIENT_ID_MAX_LENGTH_REACH = errorBuilder
  .create()
  .reason("CLIENT_ID_MAX_LENGTH_REACH")
  .key(ERROR_KEYS.CLIENT_ID_VALIDATION)
  .build();

const CLIENT_ID_MIN_LENGTH_REACH = errorBuilder
  .create()
  .reason("CLIENT_ID_MIN_LENGTH_REACH")
  .key(ERROR_KEYS.CLIENT_ID_VALIDATION)
  .build();

const CLIENT_ID_NOT_DEFINED = errorBuilder
  .create()
  .reason("CLIENT_ID_NOT_DEFINED")
  .key(ERROR_KEYS.CLIENT_ID_VALIDATION)
  .build();

const CONTACT_INVALID_TYPE = errorBuilder
  .create()
  .reason("CONTACT_INVALID_TYPE")
  .key(ERROR_KEYS.CONTACT_VALIDATION)
  .build();

const CONTACTS_INVALID_TYPE = errorBuilder
  .create()
  .reason("CONTACTS_INVALID_TYPE")
  .key(ERROR_KEYS.CONTACT_VALIDATION)
  .build();

const CONTACTS_REQUIRED = errorBuilder
  .create()
  .reason("CONTACTS_REQUIRED")
  .key(ERROR_KEYS.CONTACT_VALIDATION)
  .build();

const CONTACT_ITEM_EXIST = errorBuilder
  .create()
  .reason("CONTACT_ITEM_EXIST")
  .key(ERROR_KEYS.CONTACT_VALIDATION)
  .build();

const CONTACT_ITEM_NOT_EXIST = errorBuilder
  .create()
  .reason("CONTACT_ITEM_NOT_EXIST")
  .key(ERROR_KEYS.CONTACT_VALIDATION)
  .build();

const COUNTRY_CODE_INVALID_TYPE = errorBuilder
  .create()
  .reason("COUNTRY_CODE_INVALID_TYPE")
  .key(ERROR_KEYS.COUNTRY_CODE_VALIDATION)
  .build();

const COUNTRY_CODE_NUMERIC = errorBuilder
  .create()
  .reason("COUNTRY_CODE_NUMERIC")
  .key(ERROR_KEYS.COUNTRY_CODE_VALIDATION)
  .build();

const COUNTRY_CODE_INVALID = errorBuilder
  .create()
  .reason("COUNTRY_CODE_INVALID")
  .key(ERROR_KEYS.COUNTRY_CODE_VALIDATION)
  .build();

const COUNTRY_CODE_EMPTY = errorBuilder
  .create()
  .reason("COUNTRY_CODE_EMPTY")
  .key(ERROR_KEYS.COUNTRY_CODE_VALIDATION)
  .build();

const COUNTRY_CODE_NOT_SUPPORTED = errorBuilder
  .create()
  .reason("COUNTRY_CODE_NOT_SUPPORTED")
  .key(ERROR_KEYS.COUNTRY_CODE_VALIDATION)
  .build();

const COUNTRY_CODE_MAXLENGTH_REACH = errorBuilder
  .create()
  .reason("COUNTRY_CODE_MAXLENGTH_REACH")
  .key(ERROR_KEYS.COUNTRY_CODE_VALIDATION)
  .build();

const COUNTRY_CODE_MINLENGTH_REACH = errorBuilder
  .create()
  .reason("COUNTRY_CODE_MINLENGTH_REACH")
  .key(ERROR_KEYS.COUNTRY_CODE_VALIDATION)
  .build();

const COUNTRY_CODE_REQUIRED = errorBuilder
  .create()
  .reason("COUNTRY_CODE_REQUIRED")
  .key(ERROR_KEYS.COUNTRY_CODE_VALIDATION)
  .build();

const COUNTRY_NOT_SUPPORTED = errorBuilder
  .create()
  .reason("COUNTRY_NOT_SUPPORTED")
  .key(ERROR_KEYS.COUNTRY_NOT_SUPPORTED_VALIDATION)
  .build();

const CREATED_AT_EMPTY = errorBuilder
  .create()
  .reason("CREATED_AT_EMPTY")
  .key(ERROR_KEYS.CREATED_AT_VALIDATION)
  .build();

const COUNTRY_NAME_NOT_SUPPORTED = errorBuilder
  .create()
  .reason("COUNTRY_NAME_NOT_SUPPORTED")
  .key(ERROR_KEYS.COUNTRY_NAME_VALIDATION)
  .build();

const COUNTRY_NAME_INVALID = errorBuilder
  .create()
  .reason("COUNTRY_NAME_INVALID")
  .key(ERROR_KEYS.COUNTRY_NAME_VALIDATION)
  .build();

const COUNTRY_NAME_INVALID_TYPE = errorBuilder
  .create()
  .reason("COUNTRY_NAME_INVALID_TYPE")
  .key(ERROR_KEYS.COUNTRY_NAME_VALIDATION)
  .build();

const COUNTRY_NAME_EMPTY = errorBuilder
  .create()
  .reason("COUNTRY_NAME_EMPTY")
  .key(ERROR_KEYS.COUNTRY_NAME_VALIDATION)
  .build();

const COUNTRY_NAME_MAXLENGTH_REACH = errorBuilder
  .create()
  .reason("COUNTRY_NAME_MAXLENGTH_REACH")
  .key(ERROR_KEYS.COUNTRY_NAME_VALIDATION)
  .build();

const COUNTRY_NAME_MINLENGTH_REACH = errorBuilder
  .create()
  .reason("COUNTRY_NAME_MINLENGTH_REACH")
  .key(ERROR_KEYS.COUNTRY_NAME_VALIDATION)
  .build();

const COUNTRY_NAME_REQUIRED = errorBuilder
  .create()
  .reason("COUNTRY_NAME_REQUIRED")
  .key(ERROR_KEYS.COUNTRY_NAME_VALIDATION)
  .build();

const CREATED_AT_INVALID_TYPE = errorBuilder
  .create()
  .reason("CREATED_AT_INVALID_TYPE")
  .key(ERROR_KEYS.CREATED_AT_VALIDATION)
  .build();

const CREATED_AT_REQUIRED = errorBuilder
  .create()
  .reason("CREATED_AT_REQUIRED")
  .key(ERROR_KEYS.CREATED_AT_VALIDATION)
  .build();

const CURRENT_USER_EXIST = errorBuilder
  .create()
  .authError()
  .reason("CURRENT_USER_EXIST")
  .key(ERROR_KEYS.USER_VALIDATION)
  .build();

const CURRENT_USER_NOT_EXIST = errorBuilder
  .create()
  .authError()
  .reason("CURRENT_USER_NOT_EXIST")
  .key(ERROR_KEYS.USER_VALIDATION)
  .build();

const EVENT_NOT_FOUND = errorBuilder
  .create()
  .key(ERROR_KEYS.UNKNOWN_EVENT)
  .reason("EVENT_NOT_FOUND")
  .build();

const FIRST_NAME_INVALID_TYPE = errorBuilder
  .create()
  .reason("FIRST_NAME_INVALID_TYPE")
  .key(ERROR_KEYS.FIRST_NAME_VALIDATION)
  .build();

const FIRST_NAME_EMPTY = errorBuilder
  .create()
  .reason("FIRST_NAME_EMPTY")
  .key(ERROR_KEYS.FIRST_NAME_VALIDATION)
  .build();

const FIRST_NAME_INVALID = errorBuilder
  .create()
  .reason("FIRST_NAME_INVALID")
  .key(ERROR_KEYS.FIRST_NAME_VALIDATION)
  .build();

const FIRST_NAME_MAXLENGTH_REACH = errorBuilder
  .create()
  .reason("FIRST_NAME_MAXLENGTH_REACH")
  .key(ERROR_KEYS.FIRST_NAME_VALIDATION)
  .build();

const FIRST_NAME_MINLENGTH_REACH = errorBuilder
  .create()
  .reason("FIRST_NAME_MINLENGTH_REACH")
  .key(ERROR_KEYS.FIRST_NAME_VALIDATION)
  .build();

const FIRST_NAME_REQUIRED = errorBuilder
  .create()
  .reason("FIRST_NAME_REQUIRED")
  .key(ERROR_KEYS.FIRST_NAME_VALIDATION)
  .build();

const FULL_NAME_INVALID = errorBuilder
  .create()
  .reason("FULL_NAME_INVALID")
  .key(ERROR_KEYS.FULL_NAME_VALIDATION)
  .build();

const INPUT_DATA_NOT_DEFINED = errorBuilder
  .create()
  .key(ERROR_KEYS.INPUT_OUTPUT_FIELDS)
  .reason("INPUT_DATA_NOT_DEFINED")
  .build();

const INPUT_FIELDS_MISSING = errorBuilder
  .create()
  .key(ERROR_KEYS.INPUT_OUTPUT_FIELDS)
  .reason("INPUT_FIELDS_MISSING")
  .build();

const INPUT_FIELDS_OVERLOAD = errorBuilder
  .create()
  .key(ERROR_KEYS.INPUT_OUTPUT_FIELDS)
  .reason("INPUT_FIELDS_OVERLOAD")
  .build();

const IS_NOT_A_CALLBACK = errorBuilder
  .create()
  .key(ERROR_KEYS.SOCKET_ARGS_VALIDATION)
  .reason("IS_NOT_A_CALLBACK")
  .build();

const INPUT_FIELD_INVALID_TYPE = errorBuilder
  .create()
  .key(ERROR_KEYS.INPUT_OUTPUT_FIELDS)
  .reason("INPUT_FIELD_INVALID_TYPE")
  .build();

const LAST_NAME_INVALID = errorBuilder
  .create()
  .reason("LAST_NAME_INVALID")
  .key(ERROR_KEYS.LAST_NAME_VALIDATION)
  .build();

const LAST_NAME_INVALID_TYPE = errorBuilder
  .create()
  .reason("LAST_NAME_INVALID_TYPE")
  .key(ERROR_KEYS.LAST_NAME_VALIDATION)
  .build();

const LAST_NAME_EMPTY = errorBuilder
  .create()
  .reason("LAST_NAME_EMPTY")
  .key(ERROR_KEYS.LAST_NAME_VALIDATION)
  .build();

const LAST_NAME_MAXLENGTH_REACH = errorBuilder
  .create()
  .reason("LAST_NAME_MAXLENGTH_REACH")
  .key(ERROR_KEYS.LAST_NAME_VALIDATION)
  .build();

const LAST_NAME_MINLENGTH_REACH = errorBuilder
  .create()
  .reason("LAST_NAME_MINLENGTH_REACH")
  .key(ERROR_KEYS.LAST_NAME_VALIDATION)
  .build();

const LAST_NAME_REQUIRED = errorBuilder
  .create()
  .reason("LAST_NAME_REQUIRED")
  .key(ERROR_KEYS.LAST_NAME_VALIDATION)
  .build();

const MAC_ADDRESS_EMPTY = errorBuilder
  .create()
  .reason("MAC_ADDRESS_EMPTY")
  .key(ERROR_KEYS.MAC_ADDRESS_VALIDATION)
  .build();

const MAC_ADDRESS_EXIST = errorBuilder
  .create()
  .reason("MAC_ADDRESS_EXIST")
  .key(ERROR_KEYS.MAC_ADDRESS_VALIDATION)
  .build();

const MAC_ADDRESS_INVALID_TYPE = errorBuilder
  .create()
  .reason("MAC_ADDRESS_INVALID_TYPE")
  .key(ERROR_KEYS.MAC_ADDRESS_VALIDATION)
  .build();

const MAC_ADDRESS_MAXLENGTH_REACH = errorBuilder
  .create()
  .reason("MAC_ADDRESS_MAXLENGTH_REACH")
  .key(ERROR_KEYS.MAC_ADDRESS_VALIDATION)
  .build();

const MAC_ADDRESS_MINLENGTH_REACH = errorBuilder
  .create()
  .reason("MAC_ADDRESS_MINLENGTH_REACH")
  .key(ERROR_KEYS.MAC_ADDRESS_VALIDATION)
  .build();

const MAC_ADDRESS_REQUIRED = errorBuilder
  .create()
  .reason("MAC_ADDRESS_REQUIRED")
  .key(ERROR_KEYS.MAC_ADDRESS_VALIDATION)
  .build();

const MESSAGE_ID_EMPTY = errorBuilder
  .create()
  .reason("MESSAGE_ID_EMPTY")
  .key(ERROR_KEYS.MESSAGE_ID_VALIDATION)
  .build();

const MESSAGE_ID_EXIST = errorBuilder
  .create()
  .reason("MESSAGE_ID_EXIST")
  .key(ERROR_KEYS.MESSAGE_ID_VALIDATION)
  .build();

const MESSAGE_ID_INVALID_TYPE = errorBuilder
  .create()
  .reason("MESSAGE_ID_INVALID_TYPE")
  .key(ERROR_KEYS.MESSAGE_ID_VALIDATION)
  .build();

const MESSAGE_ID_MAX_LENGTH_REACH = errorBuilder
  .create()
  .reason("MESSAGE_ID_MAX_LENGTH_REACH")
  .key(ERROR_KEYS.MESSAGE_ID_VALIDATION)
  .build();

const MESSAGE_ID_MIN_LENGTH_REACH = errorBuilder
  .create()
  .reason("MESSAGE_ID_MIN_LENGTH_REACH")
  .key(ERROR_KEYS.MESSAGE_ID_VALIDATION)
  .build();

const MESSAGE_ID_REQUIRED = errorBuilder
  .create()
  .reason("MESSAGE_ID_REQUIRED")
  .key(ERROR_KEYS.MESSAGE_ID_VALIDATION)
  .build();

const MESSAGE_TEXT_INVALID_TYPE = errorBuilder
  .create()
  .reason("MESSAGE_TEXT_INVALID_TYPE")
  .key(ERROR_KEYS.MESSAGE_TEXT_VALIDATION)
  .build();

const MESSAGE_TEXT_EMPTY = errorBuilder
  .create()
  .reason("MESSAGE_TEXT_EMPTY")
  .key(ERROR_KEYS.MESSAGE_TEXT_VALIDATION)
  .build();

const MESSAGE_TEXT_INVALID = errorBuilder
  .create()
  .reason("MESSAGE_TEXT_INVALID")
  .key(ERROR_KEYS.MESSAGE_TEXT_VALIDATION)
  .build();

const MESSAGE_TEXT_MAX_LENGTH_REACH = errorBuilder
  .create()
  .reason("MESSAGE_TEXT_MAX_LENGTH_REACH")
  .key(ERROR_KEYS.MESSAGE_TEXT_VALIDATION)
  .build();

const MESSAGE_TEXT_MIN_LENGTH_REACH = errorBuilder
  .create()
  .reason("MESSAGE_TEXT_MIN_LENGTH_REACH")
  .key(ERROR_KEYS.MESSAGE_TEXT_VALIDATION)
  .build();

const MESSAGE_TEXT_REQUIRED = errorBuilder
  .create()
  .reason("MESSAGE_TEXT_REQUIRED")
  .key(ERROR_KEYS.MESSAGE_TEXT_VALIDATION)
  .build();

const MESSAGES_INVALID_TYPE = errorBuilder
  .create()
  .reason("MESSAGES_INVALID_TYPE")
  .key(ERROR_KEYS.MESSAGES_VALIDATION)
  .build();

const MESSAGES_REQUIRED = errorBuilder
  .create()
  .reason("MESSAGES_REQUIRED")
  .key(ERROR_KEYS.MESSAGES_VALIDATION)
  .build();

const ONLINE_INVALID_TYPE = errorBuilder
  .create()
  .reason("ONLINE_INVALID_TYPE")
  .key(ERROR_KEYS.ONLINE_VALIDATION)
  .build();

const ONLINE_REQUIRED = errorBuilder
  .create()
  .reason("ONLINE_REQUIRED")
  .key(ERROR_KEYS.ONLINE_VALIDATION)
  .build();

const OUTPUT_DATA_NOT_DEFINED = errorBuilder
  .create()
  .reason("OUTPUT_DATA_NOT_DEFINED")
  .key(ERROR_KEYS.ONLINE_VALIDATION)
  .build();

const PHONE_NUMBER_INVALID_TYPE = errorBuilder
  .create()
  .reason("PHONE_NUMBER_INVALID_TYPE")
  .key(ERROR_KEYS.PHONE_NUMBER_VALIDATION)
  .build();

const PHONE_NUMBER_INVALID = errorBuilder
  .create()
  .reason("PHONE_NUMBER_INVALID")
  .key(ERROR_KEYS.PHONE_NUMBER_VALIDATION)
  .build();

const PHONE_NUMBER_EMPTY = errorBuilder
  .create()
  .reason("PHONE_NUMBER_EMPTY")
  .key(ERROR_KEYS.PHONE_NUMBER_VALIDATION)
  .build();

const PHONE_NUMBER_EXIST = errorBuilder
  .create()
  .reason("PHONE_NUMBER_EXIST")
  .key(ERROR_KEYS.PHONE_NUMBER_VALIDATION)
  .build();

const PHONE_NUMBER_REQUIRED = errorBuilder
  .create()
  .reason("PHONE_NUMBER_REQUIRED")
  .key(ERROR_KEYS.PHONE_NUMBER_VALIDATION)
  .build();

const PRIVATE_CHATS_INVALID_TYPE = errorBuilder
  .create()
  .reason("PRIVATE_CHATS_INVALID_TYPE")
  .key(ERROR_KEYS.PRIVATE_CHAT_VALIDATION)
  .build();

const PHONE_NUMBER_MINLENGTH_REACH = errorBuilder
  .create()
  .reason("PHONE_NUMBER_MINLENGTH_REACH")
  .key(ERROR_KEYS.PHONE_NUMBER_VALIDATION)
  .build();

const PHONE_NUMBER_MAXLENGTH_REACH = errorBuilder
  .create()
  .reason("PHONE_NUMBER_MAXLENGTH_REACH")
  .key(ERROR_KEYS.PHONE_NUMBER_VALIDATION)
  .build();

const PHONE_NUMBER_NUMERIC = errorBuilder
  .create()
  .reason("PHONE_NUMBER_NUMERIC")
  .key(ERROR_KEYS.PHONE_NUMBER_VALIDATION)
  .build();

const SELF_STUFF = errorBuilder
  .create()
  .reason("SELF_STUFF")
  .key(ERROR_KEYS.SELF_STUFF_VALIDATION)
  .build();

const PARTICIPANT_EMPTY = errorBuilder
  .create()
  .reason("PARTICIPANT_EMPTY")
  .key(ERROR_KEYS.PARTICIPANT_VALIDATION)
  .build();

const PARTICIPANTS_EMPTY = errorBuilder
  .create()
  .reason("PARTICIPANT_EMPTY")
  .key(ERROR_KEYS.PARTICIPANTS_VALIDATION)
  .build();

const PARTICIPANTS_INVALID_LENGTH = errorBuilder
  .create()
  .reason("PARTICIPANTS_INVALID_LENGTH")
  .key(ERROR_KEYS.PARTICIPANTS_VALIDATION)
  .build();

const PARTICIPANTS_INVALID_TYPE = errorBuilder
  .create()
  .reason("PARTICIPANTS_INVALID_TYPE")
  .key(ERROR_KEYS.PARTICIPANTS_VALIDATION)
  .build();

const PARTICIPANTS_REQUIRED = errorBuilder
  .create()
  .reason("PARTICIPANTS_REQUIRED")
  .key(ERROR_KEYS.PARTICIPANTS_VALIDATION)
  .build();

const PARTICIPANT_ID_EXIST = errorBuilder
  .create()
  .reason("PARTICIPANT_ID_EXIST")
  .key(ERROR_KEYS.PARTICIPANT_ID_VALIDATION)
  .build();

const PARTICIPANT_ID_INVALID = errorBuilder
  .create()
  .reason("PARTICIPANT_ID_INVALID")
  .key(ERROR_KEYS.PARTICIPANT_ID_VALIDATION)
  .build();

const PARTICIPANT_ID_INVALID_TYPE = errorBuilder
  .create()
  .reason("PARTICIPANT_ID_INVALID_TYPE")
  .key(ERROR_KEYS.PARTICIPANT_ID_VALIDATION)
  .build();

const PARTICIPANT_ID_MAX_LENGTH_REACH = errorBuilder
  .create()
  .reason("PARTICIPANT_ID_MAX_LENGTH_REACH")
  .key(ERROR_KEYS.PARTICIPANT_ID_VALIDATION)
  .build();

const PARTICIPANT_ID_MIN_LENGTH_REACH = errorBuilder
  .create()
  .reason("PARTICIPANT_ID_MIN_LENGTH_REACH")
  .key(ERROR_KEYS.PARTICIPANT_ID_VALIDATION)
  .build();

const PARTICIPANT_ID_REQUIRED = errorBuilder
  .create()
  .reason("PARTICIPANT_ID_REQUIRED")
  .key(ERROR_KEYS.PARTICIPANT_ID_VALIDATION)
  .build();

const PARTICIPANT_ID_EMPTY = errorBuilder
  .create()
  .reason("PARTICIPANT_ID_EMPTY")
  .key(ERROR_KEYS.PARTICIPANT_ID_VALIDATION)
  .build();

const PARTICIPANT_NOT_EXIST = errorBuilder
  .create()
  .reason("PARTICIPANT_NOT_EXIST")
  .key(ERROR_KEYS.PARTICIPANT_ID_VALIDATION)
  .build();

const ROUTE_NOT_FOUND = errorBuilder
  .create()
  .key(ERROR_KEYS.UNKNOWN_ROUTE)
  .reason("ROUTE_NOT_FOUND")
  .build();

const SENDER_EMPTY = errorBuilder
  .create()
  .reason("SENDER_EMPTY")
  .key(ERROR_KEYS.SENDER_ID_VALIDATION)
  .build();

const SENDER_ID_EXIST = errorBuilder
  .create()
  .reason("SENDER_ID_EXIST")
  .key(ERROR_KEYS.SENDER_ID_VALIDATION)
  .build();

const SENDER_ID_INVALID_TYPE = errorBuilder
  .create()
  .reason("SENDER_ID_INVALID_TYPE")
  .key(ERROR_KEYS.SENDER_ID_VALIDATION)
  .build();

const SENDER_ID_MAX_LENGTH_REACH = errorBuilder
  .create()
  .reason("SENDER_ID_MAX_LENGTH_REACH")
  .key(ERROR_KEYS.SENDER_ID_VALIDATION)
  .build();

const SENDER_ID_MIN_LENGTH_REACH = errorBuilder
  .create()
  .reason("SENDER_ID_MIN_LENGTH_REACH")
  .key(ERROR_KEYS.SENDER_ID_VALIDATION)
  .build();

const SENDER_ID_REQUIRED = errorBuilder
  .create()
  .reason("SENDER_ID_REQUIRED")
  .key(ERROR_KEYS.SENDER_ID_VALIDATION)
  .build();

const SESSIONS_INVALID_TYPE = errorBuilder
  .create()
  .reason("SESSIONS_INVALID_TYPE")
  .key(ERROR_KEYS.SESSIONS_VALIDATION)
  .build();

const SESSIONS_REQUIRED = errorBuilder
  .create()
  .reason("SESSIONS_REQUIRED")
  .key(ERROR_KEYS.SESSIONS_VALIDATION)
  .build();

const STATUS_INVALID_TYPE = errorBuilder
  .create()
  .reason("STATUS_INVALID_TYPE")
  .key(ERROR_KEYS.STATUS_VALIDATION)
  .build();

const STATUS_REQUIRED = errorBuilder
  .create()
  .reason("STATUS_REQUIRED")
  .key(ERROR_KEYS.STATUS_VALIDATION)
  .build();

const TARGET_USER_NOT_EXIST = errorBuilder
  .create()
  .reason("TARGET_USER_NOT_EXIST")
  .key(ERROR_KEYS.TARGET_USER_VALIDATION)
  .build();

const SESSION_EXIST = errorBuilder
  .create()
  .reason("SESSION_EXIST")
  .key(ERROR_KEYS.SESSION_VALIDATION)
  .build();

const SESSION_REQUIRED = errorBuilder
  .create()
  .authError()
  .reason("SESSION_REQUIRED")
  .key(ERROR_KEYS.SESSION_VALIDATION)
  .build();

const SESSION_INVALID = errorBuilder
  .create()
  .authError()
  .reason("SESSION_INVALID")
  .key(ERROR_KEYS.SESSION_VALIDATION)
  .build();

const SESSION_EMPTY = errorBuilder
  .create()
  .authError()
  .reason("SESSION_INVALID")
  .key(ERROR_KEYS.SESSION_VALIDATION)
  .build();

const SESSION_CAN_NOT_VERIFIED = errorBuilder
  .create()
  .authError()
  .reason("SESSION_CAN_NOT_VERIFIED")
  .key(ERROR_KEYS.SESSION_VALIDATION)
  .build();

const SESSION_INVALID_TYPE = errorBuilder
  .create()
  .authError()
  .reason("SESSION_INVALID_TYPE")
  .key(ERROR_KEYS.SESSION_VALIDATION)
  .build();

const SESSION_MINLENGTH_REACH = errorBuilder
  .create()
  .authError()
  .reason("SESSION_MINLENGTH_REACH")
  .key(ERROR_KEYS.SESSION_VALIDATION)
  .build();

const SESSION_MAXLENGTH_REACH = errorBuilder
  .create()
  .authError()
  .reason("SESSION_MAXLENGTH_REACH")
  .key(ERROR_KEYS.SESSION_VALIDATION)
  .build();

const CLIENT_NOT_FOUND = errorBuilder
  .create()
  .authError()
  .reason("CLIENT_NOT_FOUND")
  .key(ERROR_KEYS.CLIENT_VALIDATION)
  .build();
const CLIENT_NOT_VERIFIED = errorBuilder
  .create()
  .authError()
  .reason("CLIENT_NOT_VERIFIED")
  .key(ERROR_KEYS.CLIENT_VALIDATION)
  .build();

const USER_NO_LONGER_PARTICIPANT = errorBuilder
  .create()
  .reason("USER_NO_LONGER_PARTICIPANT")
  .key(ERROR_KEYS.USER_VALIDATION)
  .build();

const CURRENT_SESSION_NOT_EXIST = errorBuilder
  .create()
  .reason("CURRENT_SESSION_NOT_EXIST")
  .key(ERROR_KEYS.USER_VALIDATION)
  .build();

const USER_EXIST = errorBuilder
  .create()
  .reason("USER_EXIST")
  .key(ERROR_KEYS.USER_VALIDATION)
  .build();

const USER_ID_EXIST = errorBuilder
  .create()
  .reason("USER_ID_EXIST")
  .key(ERROR_KEYS.USER_ID_VALIDATION)
  .build();

const USER_ID_INVALID_TYPE = errorBuilder
  .create()
  .reason("USER_ID_INVALID_TYPE")
  .key(ERROR_KEYS.USER_ID_VALIDATION)
  .build();

const USER_ID_INVALID = errorBuilder
  .create()
  .reason("USER_ID_INVALID")
  .key(ERROR_KEYS.USER_ID_VALIDATION)
  .build();

const USER_ID_MAX_LENGTH_REACH = errorBuilder
  .create()
  .reason("USER_ID_MAX_LENGTH_REACH")
  .key(ERROR_KEYS.USER_ID_VALIDATION)
  .build();

const USER_ID_MIN_LENGTH_REACH = errorBuilder
  .create()
  .reason("USER_ID_MIN_LENGTH_REACH")
  .key(ERROR_KEYS.USER_ID_VALIDATION)
  .build();

const USER_ID_REQUIRED = errorBuilder
  .create()
  .reason("USER_ID_REQUIRED")
  .key(ERROR_KEYS.USER_ID_VALIDATION)
  .build();

const USER_ID_EMPTY = errorBuilder
  .create()
  .reason("USER_ID_EMPTY")
  .key(ERROR_KEYS.USER_ID_VALIDATION)
  .build();

const USERNAME_EMPTY = errorBuilder
  .create()
  .reason("USERNAME_EMPTY")
  .key(ERROR_KEYS.USERNAME_VALIDATION)
  .build();

const USERNAME_EXIST = errorBuilder
  .create()
  .reason("USERNAME_EXIST")
  .key(ERROR_KEYS.USERNAME_VALIDATION)
  .build();

const USERNAME_INVALID_TYPE = errorBuilder
  .create()
  .reason("USERNAME_INVALID_TYPE")
  .key(ERROR_KEYS.USERNAME_VALIDATION)
  .build();

const USERNAME_INVALID = errorBuilder
  .create()
  .reason("USERNAME_INVALID")
  .key(ERROR_KEYS.USERNAME_VALIDATION)
  .build();

const USERNAME_REQUIRED = errorBuilder
  .create()
  .reason("USERNAME_REQUIRED")
  .key(ERROR_KEYS.USERNAME_VALIDATION)
  .build();

const USERNAME_MAXLENGTH_REACH = errorBuilder
  .create()
  .reason("USERNAME_MAXLENGTH_REACH")
  .key(ERROR_KEYS.USERNAME_VALIDATION)
  .build();

const USERNAME_MINLENGTH_REACH = errorBuilder
  .create()
  .reason("USERNAME_MINLENGTH_REACH")
  .key(ERROR_KEYS.USERNAME_VALIDATION)
  .build();

const VERIFICATION_CODE_INVALID = errorBuilder
  .create()
  .reason("VERIFICATION_CODE_INVALID")
  .key(ERROR_KEYS.VERIFICATION_CODE_VALIDATION)
  .build();

const VERIFICATION_CODE_REQUIRED = errorBuilder
  .create()
  .reason("VERIFICATION_CODE_REQUIRED")
  .key(ERROR_KEYS.VERIFICATION_CODE_VALIDATION)
  .build();

const VERIFICATION_CODE_INVALID_TYPE = errorBuilder
  .create()
  .reason("VERIFICATION_CODE_INVALID_TYPE")
  .key(ERROR_KEYS.VERIFICATION_CODE_VALIDATION)
  .build();

const VERIFICATION_CODE_NUMERIC = errorBuilder
  .create()
  .reason("VERIFICATION_CODE_NUMERIC")
  .key(ERROR_KEYS.VERIFICATION_CODE_VALIDATION)
  .build();

const VERIFICATION_CODE_EMPTY = errorBuilder
  .create()
  .reason("VERIFICATION_CODE_EMPTY")
  .key(ERROR_KEYS.VERIFICATION_CODE_VALIDATION)
  .build();

const VERIFICATION_CODE_INVALID_LENGTH = errorBuilder
  .create()
  .reason("VERIFICATION_CODE_INVALID_LENGTH")
  .key(ERROR_KEYS.VERIFICATION_CODE_VALIDATION)
  .build();

const VERIFICATION_CODE_MAXLENGTH_REACH = errorBuilder
  .create()
  .reason("VERIFICATION_CODE_MAXLENGTH_REACH")
  .key(ERROR_KEYS.VERIFICATION_CODE_VALIDATION)
  .build();

const COOKIE_IS_UNDEFINED = errorBuilder
  .create()
  .reason("COOKIE_IS_UNDEFINED")
  .side("client")
  .authError()
  .key(ERROR_KEYS.SESSION_VALIDATION)
  .build();

const userErrors = {
  BIO_EMPTY,
  BIO_INVALID,
  BIO_INVALID_TYPE,
  BIO_MAXLENGTH_REACH,
  BIO_MINLENGTH_REACH,
  BIO_REQUIRED,
  BLACKLIST_INVALID_TYPE,
  BLACKLIST_ITEM_EXIST,
  BLACKLIST_ITEM_NOT_EXIST,
  BLACKLIST_REQUIRED,
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
  CLIENT_ID_INVALID_TYPE,
  CLIENT_ID_MAX_LENGTH_REACH,
  CLIENT_ID_MIN_LENGTH_REACH,
  CLIENT_ID_NOT_DEFINED,
  CLIENT_ID_REQUIRED,
  CLIENT_NOT_FOUND,
  CLIENT_NOT_VERIFIED,
  CONTACT_INVALID_TYPE,
  CONTACT_ITEM_EXIST,
  CONTACT_ITEM_NOT_EXIST,
  CONTACTS_INVALID_TYPE,
  CONTACTS_REQUIRED,
  COOKIE_IS_UNDEFINED,
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
  CREATED_AT_EMPTY,
  CREATED_AT_INVALID_TYPE,
  CREATED_AT_REQUIRED,
  CURRENT_SESSION_NOT_EXIST,
  CURRENT_USER_EXIST,
  CURRENT_USER_NOT_EXIST,
  EVENT_NOT_FOUND,
  FIRST_NAME_EMPTY,
  FIRST_NAME_INVALID,
  FIRST_NAME_INVALID_TYPE,
  FIRST_NAME_MAXLENGTH_REACH,
  FIRST_NAME_MINLENGTH_REACH,
  FIRST_NAME_REQUIRED,
  FULL_NAME_INVALID,
  INPUT_DATA_NOT_DEFINED,
  INPUT_FIELD_INVALID_TYPE,
  INPUT_FIELDS_MISSING,
  INPUT_FIELDS_OVERLOAD,
  IS_NOT_A_CALLBACK,
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
  MESSAGE_ID_EMPTY,
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
  MESSAGES_INVALID_TYPE,
  MESSAGES_REQUIRED,
  ONLINE_INVALID_TYPE,
  ONLINE_REQUIRED,
  OUTPUT_DATA_NOT_DEFINED,
  PARTICIPANT_EMPTY,
  PARTICIPANT_ID_EMPTY,
  PARTICIPANT_ID_EXIST,
  PARTICIPANT_ID_INVALID,
  PARTICIPANT_ID_INVALID_TYPE,
  PARTICIPANT_ID_MAX_LENGTH_REACH,
  PARTICIPANT_ID_MIN_LENGTH_REACH,
  PARTICIPANT_ID_REQUIRED,
  PARTICIPANT_NOT_EXIST,
  PARTICIPANTS_EMPTY,
  PARTICIPANTS_INVALID_LENGTH,
  PARTICIPANTS_INVALID_TYPE,
  PARTICIPANTS_REQUIRED,
  PHONE_NUMBER_EMPTY,
  PHONE_NUMBER_EXIST,
  PHONE_NUMBER_INVALID,
  PHONE_NUMBER_INVALID_TYPE,
  PHONE_NUMBER_MAXLENGTH_REACH,
  PHONE_NUMBER_MINLENGTH_REACH,
  PHONE_NUMBER_NUMERIC,
  PHONE_NUMBER_REQUIRED,
  PRIVATE_CHATS_INVALID_TYPE,
  ROUTE_NOT_FOUND,
  SELF_STUFF,
  SENDER_EMPTY,
  SENDER_ID_EXIST,
  SENDER_ID_INVALID_TYPE,
  SENDER_ID_MAX_LENGTH_REACH,
  SENDER_ID_MIN_LENGTH_REACH,
  SENDER_ID_REQUIRED,
  SESSIONS_INVALID_TYPE,
  SESSIONS_REQUIRED,
  STATUS_INVALID_TYPE,
  STATUS_REQUIRED,
  TARGET_USER_NOT_EXIST,
  SESSION_CAN_NOT_VERIFIED,
  SESSION_EMPTY,
  SESSION_EXIST,
  SESSION_INVALID,
  SESSION_INVALID_TYPE,
  SESSION_MAXLENGTH_REACH,
  SESSION_MINLENGTH_REACH,
  SESSION_REQUIRED,
  USER_EXIST,
  USER_ID_EMPTY,
  USER_ID_EXIST,
  USER_ID_INVALID,
  USER_ID_INVALID_TYPE,
  USER_ID_MAX_LENGTH_REACH,
  USER_ID_MIN_LENGTH_REACH,
  USER_ID_REQUIRED,
  USER_NO_LONGER_PARTICIPANT,
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
};

export { userErrors };
