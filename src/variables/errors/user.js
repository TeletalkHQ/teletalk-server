const { errorBuilder } = require("@/classes/ErrorBuilder");

const { extractVersions, versionCalculator } = require("@/utilities/utilities");

const {
  ERROR_KEYS: {
    BIO_VALIDATION,
    BLACKLIST_VALIDATION,
    CELLPHONE_VALIDATION,
    CHAT_ID_VALIDATION,
    CHAT_VALIDATION,
    CHATS_VALIDATION,
    CLIENT_SIDE_ERROR,
    CONTACT_VALIDATION,
    COUNTRY_CODE_VALIDATION,
    COUNTRY_NAME_VALIDATION,
    COUNTRY_NOT_SUPPORTED_VALIDATION,
    CREATED_AT_VALIDATION,
    EXTERNAL_APP_ERROR,
    FIRST_NAME_VALIDATION,
    FULL_NAME_VALIDATION,
    INPUT_OUTPUT_FIELDS,
    LAST_NAME_VALIDATION,
    MAC_ADDRESS_VALIDATION,
    MESSAGE_ID_VALIDATION,
    MESSAGE_TEXT_VALIDATION,
    PARTICIPANT_ID_VALIDATION,
    PHONE_NUMBER_VALIDATION,
    SELF_STUFF_VALIDATION,
    SENDER_ID_VALIDATION,
    TARGET_USER_VALIDATION,
    TEMPORARY_CLIENT_VALIDATION,
    TOKEN_VALIDATION,
    UNKNOWN_ROUTE,
    USER_ID_VALIDATION,
    USER_VALIDATION,
    USERNAME_VALIDATION,
    VERIFICATION_CODE_VALIDATION,
  },
} = require("@/variables/others/errorKeys");
const { UNIQUE_ERROR_IDS } = require("@/variables/others/uniqueErrorIds");

const BIO_INVALID_TYPE = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.BIO_INVALID_TYPE)
  .errorKey(BIO_VALIDATION)
  .build();

const BIO_EMPTY = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.BIO_EMPTY)
  .errorKey(BIO_VALIDATION)
  .build();

const BIO_MAXLENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.BIO_MAXLENGTH_REACH)
  .errorKey(BIO_VALIDATION)
  .build();

const BIO_MINLENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.BIO_MINLENGTH_REACH)
  .errorKey(BIO_VALIDATION)
  .build();

const BLACKLIST_ITEM_EXIST = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.BLACKLIST_ITEM_EXIST)
  .errorKey(BLACKLIST_VALIDATION)
  .build();

const BLACKLIST_INVALID_TYPE = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.BLACKLIST_INVALID_TYPE)
  .errorKey(BLACKLIST_VALIDATION)
  .build();

const BLACKLIST_ITEM_NOT_EXIST = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.BLACKLIST_ITEM_NOT_EXIST)
  .errorKey(BLACKLIST_VALIDATION)
  .build();

const CELLPHONE_EXIST = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.CELLPHONE_EXIST)
  .errorKey(CELLPHONE_VALIDATION)
  .build();

const CELLPHONE_INVALID = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.CELLPHONE_INVALID)
  .errorKey(CELLPHONE_VALIDATION)
  .build();

const CELLPHONE_NOT_EXIST = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.CELLPHONE_NOT_EXIST)
  .errorKey(CELLPHONE_VALIDATION)
  .build();

const CELLPHONE_REQUIRED = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.CELLPHONE_REQUIRED)
  .errorKey(CELLPHONE_VALIDATION)
  .build();

const CELLPHONE_EXIST_IN_CONTACT = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.CELLPHONE_EXIST_IN_CONTACT)
  .errorKey(CELLPHONE_VALIDATION)
  .build();

const CHATS_INVALID_TYPE = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.CHATS_INVALID_TYPE)
  .errorKey(CHATS_VALIDATION)
  .build();

const CONTACT_INVALID_TYPE = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.CONTACT_INVALID_TYPE)
  .errorKey(CONTACT_VALIDATION)
  .build();

const CONTACT_ITEM_EXIST = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.CONTACT_ITEM_EXIST)
  .errorKey(CONTACT_VALIDATION)
  .build();

const CONTACT_ITEM_NOT_EXIST = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.CONTACT_ITEM_NOT_EXIST)
  .errorKey(CONTACT_VALIDATION)
  .build();

const COUNTRY_CODE_INVALID_TYPE = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.COUNTRY_CODE_INVALID_TYPE)
  .errorKey(COUNTRY_CODE_VALIDATION)
  .build();

const COUNTRY_CODE_NUMERIC = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.COUNTRY_CODE_NUMERIC)
  .errorKey(COUNTRY_CODE_VALIDATION)
  .build();

const COUNTRY_CODE_INVALID = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.COUNTRY_CODE_INVALID)
  .errorKey(COUNTRY_CODE_VALIDATION)
  .build();

const COUNTRY_CODE_EMPTY = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.COUNTRY_CODE_EMPTY)
  .errorKey(COUNTRY_CODE_VALIDATION)
  .build();

const COUNTRY_CODE_NOT_SUPPORTED = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.COUNTRY_CODE_NOT_SUPPORTED)
  .errorKey(COUNTRY_CODE_VALIDATION)
  .build();

const COUNTRY_CODE_MAXLENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.COUNTRY_CODE_MAXLENGTH_REACH)
  .errorKey(COUNTRY_CODE_VALIDATION)
  .build();

const COUNTRY_CODE_MINLENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.COUNTRY_CODE_MINLENGTH_REACH)
  .errorKey(COUNTRY_CODE_VALIDATION)
  .build();

const COUNTRY_CODE_REQUIRED = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.COUNTRY_CODE_REQUIRED)
  .errorKey(COUNTRY_CODE_VALIDATION)
  .build();

const COUNTRY_NOT_SUPPORTED = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.COUNTRY_NOT_SUPPORTED)
  .errorKey(COUNTRY_NOT_SUPPORTED_VALIDATION)
  .build();

const COUNTRY_NAME_NOT_SUPPORTED = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.COUNTRY_NAME_NOT_SUPPORTED)
  .errorKey(COUNTRY_NAME_VALIDATION)
  .build();

const COUNTRY_NAME_INVALID = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.COUNTRY_NAME_INVALID)
  .errorKey(COUNTRY_NAME_VALIDATION)
  .build();

const COUNTRY_NAME_INVALID_TYPE = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.COUNTRY_NAME_INVALID_TYPE)
  .errorKey(COUNTRY_NAME_VALIDATION)
  .build();

const COUNTRY_NAME_EMPTY = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.COUNTRY_NAME_EMPTY)
  .errorKey(COUNTRY_NAME_VALIDATION)
  .build();

const COUNTRY_NAME_MAXLENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.COUNTRY_NAME_MAXLENGTH_REACH)
  .errorKey(COUNTRY_NAME_VALIDATION)
  .build();

const COUNTRY_NAME_MINLENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.COUNTRY_NAME_MINLENGTH_REACH)
  .errorKey(COUNTRY_NAME_VALIDATION)
  .build();

const COUNTRY_NAME_REQUIRED = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.COUNTRY_NAME_REQUIRED)
  .errorKey(COUNTRY_NAME_VALIDATION)
  .build();

const CREATED_AT_INVALID_TYPE = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.CREATED_AT_INVALID_TYPE)
  .errorKey(CREATED_AT_VALIDATION)
  .build();

const CREATED_AT_REQUIRED = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.CREATED_AT_REQUIRED)
  .errorKey(CREATED_AT_VALIDATION)
  .build();

const CURRENT_USER_EXIST = errorBuilder
  .create()
  .statusCode(401)
  .errorReason(UNIQUE_ERROR_IDS.CURRENT_USER_EXIST)
  .errorKey(USER_VALIDATION)
  .build();

const CURRENT_USER_NOT_EXIST = errorBuilder
  .create()
  .statusCode(401)
  .errorReason(UNIQUE_ERROR_IDS.CURRENT_USER_NOT_EXIST)
  .errorKey(USER_VALIDATION)
  .build();

const FIRST_NAME_INVALID_TYPE = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.FIRST_NAME_INVALID_TYPE)
  .errorKey(FIRST_NAME_VALIDATION)
  .build();

const FIRST_NAME_EMPTY = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.FIRST_NAME_EMPTY)
  .errorKey(FIRST_NAME_VALIDATION)
  .build();

const FIRST_NAME_MAXLENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.FIRST_NAME_MAXLENGTH_REACH)
  .errorKey(FIRST_NAME_VALIDATION)
  .build();

const FIRST_NAME_MINLENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.FIRST_NAME_MINLENGTH_REACH)
  .errorKey(FIRST_NAME_VALIDATION)
  .build();

const FIRST_NAME_REQUIRED = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.FIRST_NAME_REQUIRED)
  .errorKey(FIRST_NAME_VALIDATION)
  .build();

const LAST_NAME_INVALID = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.LAST_NAME_INVALID)
  .errorKey(LAST_NAME_VALIDATION)
  .build();

const LAST_NAME_INVALID_TYPE = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.LAST_NAME_INVALID_TYPE)
  .errorKey(LAST_NAME_VALIDATION)
  .build();

const LAST_NAME_EMPTY = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.LAST_NAME_EMPTY)
  .errorKey(LAST_NAME_VALIDATION)
  .build();

const LAST_NAME_MAXLENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.LAST_NAME_MAXLENGTH_REACH)
  .errorKey(LAST_NAME_VALIDATION)
  .build();

const LAST_NAME_MINLENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.LAST_NAME_MINLENGTH_REACH)
  .errorKey(LAST_NAME_VALIDATION)
  .build();

const LAST_NAME_REQUIRED = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.LAST_NAME_REQUIRED)
  .errorKey(LAST_NAME_VALIDATION)
  .build();

const MAC_ADDRESS_EMPTY = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.MAC_ADDRESS_EMPTY)
  .errorKey(MAC_ADDRESS_VALIDATION)
  .build();

const MAC_ADDRESS_EXIST = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.MAC_ADDRESS_EXIST)
  .errorKey(MAC_ADDRESS_VALIDATION)
  .build();

const MAC_ADDRESS_INVALID_TYPE = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.MAC_ADDRESS_INVALID_TYPE)
  .errorKey(MAC_ADDRESS_VALIDATION)
  .build();

const MAC_ADDRESS_MAXLENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.MAC_ADDRESS_MAXLENGTH_REACH)
  .errorKey(MAC_ADDRESS_VALIDATION)
  .build();

const MAC_ADDRESS_MINLENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.MAC_ADDRESS_MINLENGTH_REACH)
  .errorKey(MAC_ADDRESS_VALIDATION)
  .build();

const MAC_ADDRESS_REQUIRED = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.MAC_ADDRESS_REQUIRED)
  .errorKey(MAC_ADDRESS_VALIDATION)
  .build();

const FULL_NAME_INVALID = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.FULL_NAME_INVALID)
  .errorKey(FULL_NAME_VALIDATION)
  .build();

const PHONE_NUMBER_INVALID_TYPE = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.PHONE_NUMBER_INVALID_TYPE)
  .errorKey(PHONE_NUMBER_VALIDATION)
  .build();

const PHONE_NUMBER_INVALID = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.PHONE_NUMBER_INVALID)
  .errorKey(PHONE_NUMBER_VALIDATION)
  .build();

const PHONE_NUMBER_EMPTY = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.PHONE_NUMBER_EMPTY)
  .errorKey(PHONE_NUMBER_VALIDATION)
  .build();

const PHONE_NUMBER_EXIST = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.PHONE_NUMBER_EXIST)
  .errorKey(PHONE_NUMBER_VALIDATION)
  .build();

const PHONE_NUMBER_REQUIRED = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.PHONE_NUMBER_REQUIRED)
  .errorKey(PHONE_NUMBER_VALIDATION)
  .build();

const PHONE_NUMBER_MINLENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.PHONE_NUMBER_MINLENGTH_REACH)
  .errorKey(PHONE_NUMBER_VALIDATION)
  .build();

const PHONE_NUMBER_MAXLENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.PHONE_NUMBER_MAXLENGTH_REACH)
  .errorKey(PHONE_NUMBER_VALIDATION)
  .build();

const PHONE_NUMBER_NUMERIC = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.PHONE_NUMBER_NUMERIC)
  .errorKey(PHONE_NUMBER_VALIDATION)
  .build();

const USER_ID_EXIST = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.USER_ID_EXIST)
  .errorKey(USER_ID_VALIDATION)
  .build();

const USER_ID_INVALID_TYPE = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.USER_ID_INVALID_TYPE)
  .errorKey(USER_ID_VALIDATION)
  .build();

const USER_ID_INVALID = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.USER_ID_INVALID)
  .errorKey(USER_ID_VALIDATION)
  .build();

const USER_ID_MAX_LENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.USER_ID_MAX_LENGTH_REACH)
  .errorKey(USER_ID_VALIDATION)
  .build();

const USER_ID_MIN_LENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.USER_ID_MIN_LENGTH_REACH)
  .errorKey(USER_ID_VALIDATION)
  .build();

const USER_ID_REQUIRED = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.USER_ID_REQUIRED)
  .errorKey(USER_ID_VALIDATION)
  .build();

const USER_ID_EMPTY = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.USER_ID_EMPTY)
  .errorKey(USER_ID_VALIDATION)
  .build();

const SELF_STUFF = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.SELF_STUFF)
  .errorKey(SELF_STUFF_VALIDATION)
  .build();

const TARGET_USER_NOT_EXIST = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.TARGET_USER_NOT_EXIST)
  .errorKey(TARGET_USER_VALIDATION)
  .build();

const TOKEN_EXIST = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.TOKEN_EXIST)
  .errorKey(TOKEN_VALIDATION)
  .build();

const TOKEN_REQUIRED = errorBuilder
  .create()
  .statusCode(401)
  .errorReason(UNIQUE_ERROR_IDS.TOKEN_REQUIRED)
  .errorKey(TOKEN_VALIDATION)
  .build();

const TOKEN_INVALID = errorBuilder
  .create()
  .statusCode(401)
  .errorReason(UNIQUE_ERROR_IDS.TOKEN_INVALID)
  .errorKey(TOKEN_VALIDATION)
  .build();

const TOKEN_CAN_NOT_VERIFIED = errorBuilder
  .create()
  .statusCode(401)
  .errorReason(UNIQUE_ERROR_IDS.TOKEN_CAN_NOT_VERIFIED)
  .errorKey(TOKEN_VALIDATION)
  .build();

const TOKEN_INVALID_TYPE = errorBuilder
  .create()
  .statusCode(401)
  .errorReason(UNIQUE_ERROR_IDS.TOKEN_INVALID_TYPE)
  .errorKey(TOKEN_VALIDATION)
  .build();

const TOKEN_MINLENGTH_REACH = errorBuilder
  .create()
  .statusCode(401)
  .errorReason(UNIQUE_ERROR_IDS.TOKEN_MINLENGTH_REACH)
  .errorKey(TOKEN_VALIDATION)
  .build();

const TOKEN_MAXLENGTH_REACH = errorBuilder
  .create()
  .statusCode(401)
  .errorReason(UNIQUE_ERROR_IDS.TOKEN_MAXLENGTH_REACH)
  .errorKey(TOKEN_VALIDATION)
  .build();

const USER_EXIST = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.USER_EXIST)
  .errorKey(USER_VALIDATION)
  .build();

const USERNAME_EMPTY = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.USERNAME_EMPTY)
  .errorKey(USERNAME_VALIDATION)
  .build();

const USERNAME_EXIST = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.USERNAME_EXIST)
  .errorKey(USERNAME_VALIDATION)
  .build();

const USERNAME_INVALID_TYPE = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.USERNAME_INVALID_TYPE)
  .errorKey(USERNAME_VALIDATION)
  .build();

const USERNAME_INVALID = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.USERNAME_INVALID)
  .errorKey(USERNAME_VALIDATION)
  .build();

const USERNAME_REQUIRED = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.USERNAME_REQUIRED)
  .errorKey(USERNAME_VALIDATION)
  .build();

const USERNAME_MAXLENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.USERNAME_MAXLENGTH_REACH)
  .errorKey(USERNAME_VALIDATION)
  .build();

const USERNAME_MINLENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.USERNAME_MINLENGTH_REACH)
  .errorKey(USERNAME_VALIDATION)
  .build();

const VERIFICATION_CODE_INVALID = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.VERIFICATION_CODE_INVALID)
  .errorKey(VERIFICATION_CODE_VALIDATION)
  .build();

const VERIFICATION_CODE_REQUIRED = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.VERIFICATION_CODE_REQUIRED)
  .errorKey(VERIFICATION_CODE_VALIDATION)
  .build();

const VERIFICATION_CODE_INVALID_TYPE = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.VERIFICATION_CODE_INVALID_TYPE)
  .errorKey(VERIFICATION_CODE_VALIDATION)
  .build();

const VERIFICATION_CODE_NUMERIC = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.VERIFICATION_CODE_NUMERIC)
  .errorKey(VERIFICATION_CODE_VALIDATION)
  .build();

const VERIFICATION_CODE_EMPTY = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.VERIFICATION_CODE_EMPTY)
  .errorKey(VERIFICATION_CODE_VALIDATION)
  .build();

const VERIFICATION_CODE_INVALID_LENGTH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.VERIFICATION_CODE_INVALID_LENGTH)
  .errorKey(VERIFICATION_CODE_VALIDATION)
  .build();

const VERIFICATION_CODE_MAXLENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.VERIFICATION_CODE_MAXLENGTH_REACH)
  .errorKey(VERIFICATION_CODE_VALIDATION)
  .build();

const TEMPORARY_CLIENT_NOT_FOUND = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.TEMPORARY_CLIENT_NOT_FOUND)
  .errorKey(TEMPORARY_CLIENT_VALIDATION)
  .build();

const CHAT_EXIST = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.CHAT_EXIST)
  .errorKey(CHAT_VALIDATION)
  .build();

const CHAT_NOT_EXIST = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.CHAT_NOT_EXIST)
  .errorKey(CHAT_VALIDATION)
  .build();

const CHAT_ID_EMPTY = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.CHAT_ID_EMPTY)
  .errorKey(CHAT_ID_VALIDATION)
  .build();

const CHAT_ID_EXIST = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.CHAT_ID_EXIST)
  .errorKey(CHAT_ID_VALIDATION)
  .build();

const CHAT_ID_INVALID = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.CHAT_ID_INVALID)
  .errorKey(CHAT_ID_VALIDATION)
  .build();

const CHAT_ID_INVALID_TYPE = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.CHAT_ID_INVALID_TYPE)
  .errorKey(CHAT_ID_VALIDATION)
  .build();

const CHAT_ID_MAX_LENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.CHAT_ID_MAX_LENGTH_REACH)
  .errorKey(CHAT_ID_VALIDATION)
  .build();

const CHAT_ID_MIN_LENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.CHAT_ID_MIN_LENGTH_REACH)
  .errorKey(CHAT_ID_VALIDATION)
  .build();

const CHAT_ID_REQUIRED = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.CHAT_ID_REQUIRED)
  .errorKey(CHAT_ID_VALIDATION)
  .build();

const MESSAGE_ID_EXIST = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.MESSAGE_ID_EXIST)
  .errorKey(MESSAGE_ID_VALIDATION)
  .build();

const MESSAGE_ID_INVALID_TYPE = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.MESSAGE_ID_INVALID_TYPE)
  .errorKey(MESSAGE_ID_VALIDATION)
  .build();

const MESSAGE_ID_MAX_LENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.MESSAGE_ID_MAX_LENGTH_REACH)
  .errorKey(MESSAGE_ID_VALIDATION)
  .build();

const MESSAGE_ID_MIN_LENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.MESSAGE_ID_MIN_LENGTH_REACH)
  .errorKey(MESSAGE_ID_VALIDATION)
  .build();

const MESSAGE_ID_REQUIRED = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.MESSAGE_ID_REQUIRED)
  .errorKey(MESSAGE_ID_VALIDATION)
  .build();

const MESSAGE_TEXT_INVALID_TYPE = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.MESSAGE_TEXT_INVALID_TYPE)
  .errorKey(MESSAGE_TEXT_VALIDATION)
  .build();

const MESSAGE_TEXT_EMPTY = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.MESSAGE_TEXT_EMPTY)
  .errorKey(MESSAGE_TEXT_VALIDATION)
  .build();

const MESSAGE_TEXT_INVALID = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.MESSAGE_TEXT_INVALID)
  .errorKey(MESSAGE_TEXT_VALIDATION)
  .build();

const MESSAGE_TEXT_MAX_LENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.MESSAGE_TEXT_MAX_LENGTH_REACH)
  .errorKey(MESSAGE_TEXT_VALIDATION)
  .build();

const MESSAGE_TEXT_MIN_LENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.MESSAGE_TEXT_MIN_LENGTH_REACH)
  .errorKey(MESSAGE_TEXT_VALIDATION)
  .build();

const MESSAGE_TEXT_REQUIRED = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.MESSAGE_TEXT_REQUIRED)
  .errorKey(MESSAGE_TEXT_VALIDATION)
  .build();

const PARTICIPANT_ID_EXIST = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.PARTICIPANT_ID_EXIST)
  .errorKey(PARTICIPANT_ID_VALIDATION)
  .build();

const PARTICIPANT_ID_INVALID = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.PARTICIPANT_ID_INVALID)
  .errorKey(PARTICIPANT_ID_VALIDATION)
  .build();

const PARTICIPANT_EMPTY = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.PARTICIPANT_EMPTY)
  .errorKey(PARTICIPANT_ID_VALIDATION)
  .build();

const PARTICIPANT_ID_INVALID_TYPE = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.PARTICIPANT_ID_INVALID_TYPE)
  .errorKey(PARTICIPANT_ID_VALIDATION)
  .build();

const PARTICIPANT_ID_MAX_LENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.PARTICIPANT_ID_MAX_LENGTH_REACH)
  .errorKey(PARTICIPANT_ID_VALIDATION)
  .build();

const PARTICIPANT_ID_MIN_LENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.PARTICIPANT_ID_MIN_LENGTH_REACH)
  .errorKey(PARTICIPANT_ID_VALIDATION)
  .build();

const PARTICIPANT_ID_REQUIRED = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.PARTICIPANT_ID_REQUIRED)
  .errorKey(PARTICIPANT_ID_VALIDATION)
  .build();

const PARTICIPANT_NOT_EXIST = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.PARTICIPANT_NOT_EXIST)
  .errorKey(PARTICIPANT_ID_VALIDATION)
  .build();

const SENDER_EMPTY = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.SENDER_EMPTY)
  .errorKey(SENDER_ID_VALIDATION)
  .build();

const SENDER_ID_EXIST = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.SENDER_ID_EXIST)
  .errorKey(SENDER_ID_VALIDATION)
  .build();

const SENDER_ID_INVALID_TYPE = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.SENDER_ID_INVALID_TYPE)
  .errorKey(SENDER_ID_VALIDATION)
  .build();

const SENDER_ID_MAX_LENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.SENDER_ID_MAX_LENGTH_REACH)
  .errorKey(SENDER_ID_VALIDATION)
  .build();

const SENDER_ID_MIN_LENGTH_REACH = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.SENDER_ID_MIN_LENGTH_REACH)
  .errorKey(SENDER_ID_VALIDATION)
  .build();

const SENDER_ID_REQUIRED = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.SENDER_ID_REQUIRED)
  .errorKey(SENDER_ID_VALIDATION)
  .build();

const USER_NO_LONGER_PARTICIPANT = errorBuilder
  .create()
  .errorReason(UNIQUE_ERROR_IDS.USER_NO_LONGER_PARTICIPANT)
  .errorKey(USER_VALIDATION)
  .build();

const ROUTE_NOT_FOUND = errorBuilder
  .create()
  .errorKey(UNKNOWN_ROUTE)
  .errorReason(UNIQUE_ERROR_IDS.ROUTE_NOT_FOUND)
  .statusCode(404)
  .build();

const INPUT_FIELDS_MISSING = errorBuilder
  .create()
  .errorKey(INPUT_OUTPUT_FIELDS)
  .errorReason(UNIQUE_ERROR_IDS.INPUT_FIELDS_MISSING)
  .build();

const INPUT_FIELDS_OVERLOAD = errorBuilder
  .create()
  .errorKey(INPUT_OUTPUT_FIELDS)
  .errorReason(UNIQUE_ERROR_IDS.INPUT_FIELDS_OVERLOAD)
  .build();

const INPUT_FIELD_TYPE_WRONG = errorBuilder
  .create()
  .errorKey(CLIENT_SIDE_ERROR)
  .errorReason(UNIQUE_ERROR_IDS.INPUT_FIELD_TYPE_WRONG)
  .build();

const METHOD_NOT_ALLOWED = errorBuilder
  .create()
  .errorKey(EXTERNAL_APP_ERROR)
  .errorReason(UNIQUE_ERROR_IDS.METHOD_NOT_ALLOWED)
  .statusCode(405)
  .build();

const errors = {
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
  CURRENT_USER_EXIST,
  CURRENT_USER_NOT_EXIST,
  FIRST_NAME_EMPTY,
  FIRST_NAME_INVALID_TYPE,
  FIRST_NAME_MAXLENGTH_REACH,
  FIRST_NAME_MINLENGTH_REACH,
  FIRST_NAME_REQUIRED,
  FULL_NAME_INVALID,
  INPUT_FIELD_TYPE_WRONG,
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
  ROUTE_NOT_FOUND,
  SELF_STUFF,
  SENDER_EMPTY,
  SENDER_ID_EXIST,
  SENDER_ID_INVALID_TYPE,
  SENDER_ID_MAX_LENGTH_REACH,
  SENDER_ID_MIN_LENGTH_REACH,
  SENDER_ID_REQUIRED,
  TARGET_USER_NOT_EXIST,
  TEMPORARY_CLIENT_NOT_FOUND,
  TOKEN_CAN_NOT_VERIFIED,
  TOKEN_EXIST,
  TOKEN_INVALID,
  TOKEN_INVALID_TYPE,
  TOKEN_MAXLENGTH_REACH,
  TOKEN_MINLENGTH_REACH,
  TOKEN_REQUIRED,
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

const userErrors = {
  version: versionCalculator(extractVersions(errors)),
  ...errors,
};

module.exports = {
  userErrors,
};
