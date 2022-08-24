const { errorBuilder } = require("@/classes/Builders");

const {
  extractVersions,
  versionCalculator,
} = require("@/functions/utilities/utils");

const {
  errorKeys: {
    BIO_VALIDATION,
    BLACKLIST_VALIDATION,
    CELLPHONE_VALIDATION,
    CHATS_VALIDATION,
    CONTACT_VALIDATION,
    COUNTRY_CODE_VALIDATION,
    COUNTRY_NAME_VALIDATION,
    COUNTRY_NOT_SUPPORTED_VALIDATION,
    CREATED_AT_VALIDATION,
    FIRST_NAME_VALIDATION,
    FULL_NAME_VALIDATION,
    LAST_NAME_VALIDATION,
    MAC_ADDRESS_VALIDATION,
    PHONE_NUMBER_VALIDATION,
    PRIVATE_ID_VALIDATION,
    SELF_STUFF_VALIDATION,
    TARGET_USER_VALIDATION,
    TOKEN_VALIDATION,
    USER_VALIDATION,
    USERNAME_VALIDATION,
    VERIFICATION_CODE_VALIDATION,
  },
} = require("@/variables/errors/errorKeys");
const { errorUniqueIds } = require("@/variables/errors/errorUniqueIds");

const BIO_INVALID_TYPE = errorBuilder
  .create()
  .errorCode(4024)
  .statusCode(400)
  .errorReason(errorUniqueIds.BIO_INVALID_TYPE)
  .version("1.0.0")
  .errorKey(BIO_VALIDATION)
  .build();

const BIO_EMPTY = errorBuilder
  .create()
  .errorCode(4076)
  .statusCode(400)
  .errorReason(errorUniqueIds.BIO_EMPTY)
  .version("1.0.0")
  .errorKey(BIO_VALIDATION)
  .build();

const BIO_MAXLENGTH_REACH = errorBuilder
  .create()
  .errorCode(4025)
  .statusCode(400)
  .errorReason(errorUniqueIds.BIO_MAXLENGTH_REACH)
  .version("1.0.0")
  .errorKey(BIO_VALIDATION)
  .build();

const BIO_MINLENGTH_REACH = errorBuilder
  .create()
  .errorCode(4026)
  .statusCode(400)
  .errorReason(errorUniqueIds.BIO_MINLENGTH_REACH)
  .version("1.0.0")
  .errorKey(BIO_VALIDATION)
  .build();

const BLACKLIST_ITEM_EXIST = errorBuilder
  .create()
  .errorCode(4000)
  .statusCode(400)
  .errorReason(errorUniqueIds.BLACKLIST_ITEM_EXIST)
  .version("1.0.0")
  .errorKey(BLACKLIST_VALIDATION)
  .build();

const BLACKLIST_INVALID_TYPE = errorBuilder
  .create()
  .errorCode(4023)
  .statusCode(400)
  .errorReason(errorUniqueIds.BLACKLIST_INVALID_TYPE)
  .version("1.0.0")
  .errorKey(BLACKLIST_VALIDATION)
  .build();

const BLACKLIST_ITEM_NOT_EXIST = errorBuilder
  .create()
  .errorCode(4000)
  .statusCode(400)
  .errorReason(errorUniqueIds.BLACKLIST_ITEM_NOT_EXIST)
  .version("1.0.0")
  .errorKey(BLACKLIST_VALIDATION)
  .build();

const CELLPHONE_EXIST = errorBuilder
  .create()
  .errorCode(4027)
  .statusCode(400)
  .errorReason(errorUniqueIds.CELLPHONE_EXIST)
  .version("1.0.0")
  .errorKey(CELLPHONE_VALIDATION)
  .build();

const CELLPHONE_INVALID = errorBuilder
  .create()
  .errorCode(4028)
  .statusCode(400)
  .errorReason(errorUniqueIds.CELLPHONE_INVALID)
  .version("1.0.0")
  .errorKey(CELLPHONE_VALIDATION)
  .build();

const CELLPHONE_NOT_EXIST = errorBuilder
  .create()
  .errorCode(4031)
  .statusCode(400)
  .errorReason(errorUniqueIds.CELLPHONE_NOT_EXIST)
  .version("1.0.0")
  .errorKey(CELLPHONE_VALIDATION)
  .build();

const CELLPHONE_REQUIRED = errorBuilder
  .create()
  .errorCode(4032)
  .statusCode(400)
  .errorReason(errorUniqueIds.CELLPHONE_REQUIRED)
  .version("1.0.0")
  .errorKey(CELLPHONE_VALIDATION)
  .build();

const CELLPHONE_EXIST_IN_CONTACT = errorBuilder
  .create()
  .errorCode(4033)
  .statusCode(400)
  .errorReason(errorUniqueIds.CELLPHONE_EXIST_IN_CONTACT)
  .version("1.0.0")
  .errorKey(CELLPHONE_VALIDATION)
  .build();

const CHATS_INVALID_TYPE = errorBuilder
  .create()
  .errorCode(4000)
  .statusCode(400)
  .errorReason(errorUniqueIds.CHATS_INVALID_TYPE)
  .version("1.0.0")
  .errorKey(CHATS_VALIDATION)
  .build();

const CONTACT_INVALID_TYPE = errorBuilder
  .create()
  .errorCode(4034)
  .statusCode(400)
  .errorReason(errorUniqueIds.CONTACT_INVALID_TYPE)
  .version("1.0.0")
  .errorKey(CONTACT_VALIDATION)
  .build();

const CONTACT_ITEM_EXIST = errorBuilder
  .create()
  .errorCode(4000)
  .statusCode(400)
  .errorReason(errorUniqueIds.CONTACT_ITEM_EXIST)
  .version("1.0.0")
  .errorKey(CONTACT_VALIDATION)
  .build();

const CONTACT_ITEM_NOT_EXIST = errorBuilder
  .create()
  .errorCode(4000)
  .statusCode(400)
  .errorReason(errorUniqueIds.CONTACT_ITEM_NOT_EXIST)
  .version("1.0.0")
  .errorKey(CONTACT_VALIDATION)
  .build();

const COUNTRY_CODE_INVALID_TYPE = errorBuilder
  .create()
  .errorCode(4035)
  .statusCode(400)
  .errorReason(errorUniqueIds.COUNTRY_CODE_INVALID_TYPE)
  .version("1.0.0")
  .errorKey(COUNTRY_CODE_VALIDATION)
  .build();

const COUNTRY_CODE_NUMERIC = errorBuilder
  .create()
  .errorCode(4035)
  .statusCode(400)
  .errorReason(errorUniqueIds.COUNTRY_CODE_NUMERIC)
  .version("1.0.0")
  .errorKey(COUNTRY_CODE_VALIDATION)
  .build();

const COUNTRY_CODE_INVALID = errorBuilder
  .create()
  .errorCode(4035)
  .statusCode(400)
  .errorReason(errorUniqueIds.COUNTRY_CODE_INVALID)
  .version("1.0.0")
  .errorKey(COUNTRY_CODE_VALIDATION)
  .build();

const COUNTRY_CODE_EMPTY = errorBuilder
  .create()
  .errorCode(4076)
  .statusCode(400)
  .errorReason(errorUniqueIds.COUNTRY_CODE_EMPTY)
  .version("1.0.0")
  .errorKey(COUNTRY_CODE_VALIDATION)
  .build();

const COUNTRY_CODE_NOT_SUPPORTED = errorBuilder
  .create()
  .errorCode(4035)
  .statusCode(400)
  .errorReason(errorUniqueIds.COUNTRY_CODE_NOT_SUPPORTED)
  .version("1.0.0")
  .errorKey(COUNTRY_CODE_VALIDATION)
  .build();

const COUNTRY_CODE_MAXLENGTH_REACH = errorBuilder
  .create()
  .errorCode(4036)
  .statusCode(400)
  .errorReason(errorUniqueIds.COUNTRY_CODE_MAXLENGTH_REACH)
  .version("1.0.0")
  .errorKey(COUNTRY_CODE_VALIDATION)
  .build();

const COUNTRY_CODE_MINLENGTH_REACH = errorBuilder
  .create()
  .errorCode(4037)
  .statusCode(400)
  .errorReason(errorUniqueIds.COUNTRY_CODE_MINLENGTH_REACH)
  .version("1.0.0")
  .errorKey(COUNTRY_CODE_VALIDATION)
  .build();

const COUNTRY_CODE_REQUIRED = errorBuilder
  .create()
  .errorCode(4038)
  .statusCode(400)
  .errorReason(errorUniqueIds.COUNTRY_CODE_REQUIRED)
  .version("1.0.0")
  .errorKey(COUNTRY_CODE_VALIDATION)
  .build();

const COUNTRY_NOT_SUPPORTED = errorBuilder
  .create()
  .errorCode(4035)
  .statusCode(400)
  .errorReason(errorUniqueIds.COUNTRY_NOT_SUPPORTED)
  .version("1.0.0")
  .errorKey(COUNTRY_NOT_SUPPORTED_VALIDATION)
  .build();

const COUNTRY_NAME_NOT_SUPPORTED = errorBuilder
  .create()
  .errorCode(4035)
  .statusCode(400)
  .errorReason(errorUniqueIds.COUNTRY_NAME_NOT_SUPPORTED)
  .version("1.0.0")
  .errorKey(COUNTRY_NAME_VALIDATION)
  .build();

const COUNTRY_NAME_INVALID = errorBuilder
  .create()
  .errorCode(4039)
  .statusCode(400)
  .errorReason(errorUniqueIds.COUNTRY_NAME_INVALID)
  .version("1.0.0")
  .errorKey(COUNTRY_NAME_VALIDATION)
  .build();

const COUNTRY_NAME_INVALID_TYPE = errorBuilder
  .create()
  .errorCode(4039)
  .statusCode(400)
  .errorReason(errorUniqueIds.COUNTRY_NAME_INVALID_TYPE)
  .version("1.0.0")
  .errorKey(COUNTRY_NAME_VALIDATION)
  .build();

const COUNTRY_NAME_EMPTY = errorBuilder
  .create()
  .errorCode(4076)
  .statusCode(400)
  .errorReason(errorUniqueIds.COUNTRY_NAME_EMPTY)
  .version("1.0.0")
  .errorKey(COUNTRY_NAME_VALIDATION)
  .build();

const COUNTRY_NAME_MAXLENGTH_REACH = errorBuilder
  .create()
  .errorCode(4040)
  .statusCode(400)
  .errorReason(errorUniqueIds.COUNTRY_NAME_MAXLENGTH_REACH)
  .version("1.0.0")
  .errorKey(COUNTRY_NAME_VALIDATION)
  .build();

const COUNTRY_NAME_MINLENGTH_REACH = errorBuilder
  .create()
  .errorCode(4041)
  .statusCode(400)
  .errorReason(errorUniqueIds.COUNTRY_NAME_MINLENGTH_REACH)
  .version("1.0.0")
  .errorKey(COUNTRY_NAME_VALIDATION)
  .build();

const COUNTRY_NAME_REQUIRED = errorBuilder
  .create()
  .errorCode(4042)
  .statusCode(400)
  .errorReason(errorUniqueIds.COUNTRY_NAME_REQUIRED)
  .version("1.0.0")
  .errorKey(COUNTRY_NAME_VALIDATION)
  .build();

const CREATED_AT_INVALID_TYPE = errorBuilder
  .create()
  .errorCode(4043)
  .statusCode(400)
  .errorReason(errorUniqueIds.CREATED_AT_INVALID_TYPE)
  .version("1.0.0")
  .errorKey(CREATED_AT_VALIDATION)
  .build();

const CREATED_AT_REQUIRED = errorBuilder
  .create()
  .errorCode(4043)
  .statusCode(400)
  .errorReason(errorUniqueIds.CREATED_AT_REQUIRED)
  .version("1.0.0")
  .errorKey(CREATED_AT_VALIDATION)
  .build();

const FIRST_NAME_INVALID_TYPE = errorBuilder
  .create()
  .errorCode(4044)
  .statusCode(400)
  .errorReason(errorUniqueIds.FIRST_NAME_INVALID_TYPE)
  .version("1.0.0")
  .errorKey(FIRST_NAME_VALIDATION)
  .build();

const FIRST_NAME_EMPTY = errorBuilder
  .create()
  .errorCode(4076)
  .statusCode(400)
  .errorReason(errorUniqueIds.FIRST_NAME_EMPTY)
  .version("1.0.0")
  .errorKey(FIRST_NAME_VALIDATION)
  .build();

const FIRST_NAME_MAXLENGTH_REACH = errorBuilder
  .create()
  .errorCode(4045)
  .statusCode(400)
  .errorReason(errorUniqueIds.FIRST_NAME_MAXLENGTH_REACH)
  .version("1.0.0")
  .errorKey(FIRST_NAME_VALIDATION)
  .build();

const FIRST_NAME_MINLENGTH_REACH = errorBuilder
  .create()
  .errorCode(4046)
  .statusCode(400)
  .errorReason(errorUniqueIds.FIRST_NAME_MINLENGTH_REACH)
  .version("1.0.0")
  .errorKey(FIRST_NAME_VALIDATION)
  .build();

const FIRST_NAME_REQUIRED = errorBuilder
  .create()
  .errorCode(4047)
  .statusCode(400)
  .errorReason(errorUniqueIds.FIRST_NAME_REQUIRED)
  .version("1.0.0")
  .errorKey(FIRST_NAME_VALIDATION)
  .build();

const LAST_NAME_INVALID = errorBuilder
  .create()
  .errorCode(4048)
  .statusCode(400)
  .errorReason(errorUniqueIds.LAST_NAME_INVALID)
  .version("1.0.0")
  .errorKey(LAST_NAME_VALIDATION)
  .build();

const LAST_NAME_INVALID_TYPE = errorBuilder
  .create()
  .errorCode(4048)
  .statusCode(400)
  .errorReason(errorUniqueIds.LAST_NAME_INVALID_TYPE)
  .version("1.0.0")
  .errorKey(LAST_NAME_VALIDATION)
  .build();

const LAST_NAME_EMPTY = errorBuilder
  .create()
  .errorCode(4076)
  .statusCode(400)
  .errorReason(errorUniqueIds.LAST_NAME_EMPTY)
  .version("1.0.0")
  .errorKey(LAST_NAME_VALIDATION)
  .build();

const LAST_NAME_MAXLENGTH_REACH = errorBuilder
  .create()
  .errorCode(4049)
  .statusCode(400)
  .errorReason(errorUniqueIds.LAST_NAME_MAXLENGTH_REACH)
  .version("1.0.0")
  .errorKey(LAST_NAME_VALIDATION)
  .build();

const LAST_NAME_MINLENGTH_REACH = errorBuilder
  .create()
  .errorCode(4050)
  .statusCode(400)
  .errorReason(errorUniqueIds.LAST_NAME_MINLENGTH_REACH)
  .version("1.0.0")
  .errorKey(LAST_NAME_VALIDATION)
  .build();

const MAC_ADDRESS_EMPTY = errorBuilder
  .create()
  .errorCode(4076)
  .statusCode(400)
  .errorReason(errorUniqueIds.MAC_ADDRESS_EMPTY)
  .version("1.0.0")
  .errorKey(MAC_ADDRESS_VALIDATION)
  .build();

const MAC_ADDRESS_EXIST = errorBuilder
  .create()
  .errorCode(4051)
  .statusCode(400)
  .errorReason(errorUniqueIds.MAC_ADDRESS_EXIST)
  .version("1.0.0")
  .errorKey(MAC_ADDRESS_VALIDATION)
  .build();

const MAC_ADDRESS_INVALID_TYPE = errorBuilder
  .create()
  .errorCode(4052)
  .statusCode(400)
  .errorReason(errorUniqueIds.MAC_ADDRESS_INVALID_TYPE)
  .version("1.0.0")
  .errorKey(MAC_ADDRESS_VALIDATION)
  .build();

const MAC_ADDRESS_MAXLENGTH_REACH = errorBuilder
  .create()
  .errorCode(4053)
  .statusCode(400)
  .errorReason(errorUniqueIds.MAC_ADDRESS_MAXLENGTH_REACH)
  .version("1.0.0")
  .errorKey(MAC_ADDRESS_VALIDATION)
  .build();

const MAC_ADDRESS_MINLENGTH_REACH = errorBuilder
  .create()
  .errorCode(4054)
  .statusCode(400)
  .errorReason(errorUniqueIds.MAC_ADDRESS_MINLENGTH_REACH)
  .version("1.0.0")
  .errorKey(MAC_ADDRESS_VALIDATION)
  .build();

const MAC_ADDRESS_REQUIRED = errorBuilder
  .create()
  .errorCode(4055)
  .statusCode(400)
  .errorReason(errorUniqueIds.MAC_ADDRESS_REQUIRED)
  .version("1.0.0")
  .errorKey(MAC_ADDRESS_VALIDATION)
  .build();

const FULL_NAME_INVALID = errorBuilder
  .create()
  .errorCode(4056)
  .statusCode(400)
  .errorReason(errorUniqueIds.FULL_NAME_INVALID)
  .version("1.0.0")
  .errorKey(FULL_NAME_VALIDATION)
  .build();

const PHONE_NUMBER_INVALID_TYPE = errorBuilder
  .create()
  .errorCode(4056)
  .statusCode(400)
  .errorReason(errorUniqueIds.PHONE_NUMBER_INVALID_TYPE)
  .version("1.0.0")
  .errorKey(PHONE_NUMBER_VALIDATION)
  .build();

const PHONE_NUMBER_INVALID = errorBuilder
  .create()
  .errorCode(4000)
  .statusCode(400)
  .errorReason(errorUniqueIds.PHONE_NUMBER_INVALID)
  .version("1.0.0")
  .errorKey(PHONE_NUMBER_VALIDATION)
  .build();

const PHONE_NUMBER_EMPTY = errorBuilder
  .create()
  .errorCode(4076)
  .statusCode(400)
  .errorReason(errorUniqueIds.PHONE_NUMBER_EMPTY)
  .version("1.0.0")
  .errorKey(PHONE_NUMBER_VALIDATION)
  .build();

const PHONE_NUMBER_EXIST = errorBuilder
  .create()
  .errorCode(4057)
  .statusCode(400)
  .errorReason(errorUniqueIds.PHONE_NUMBER_EXIST)
  .version("1.0.0")
  .errorKey(PHONE_NUMBER_VALIDATION)
  .build();

const PHONE_NUMBER_REQUIRED = errorBuilder
  .create()
  .errorCode(4058)
  .statusCode(400)
  .errorReason(errorUniqueIds.PHONE_NUMBER_REQUIRED)
  .version("1.0.0")
  .errorKey(PHONE_NUMBER_VALIDATION)
  .build();

const PHONE_NUMBER_MINLENGTH_REACH = errorBuilder
  .create()
  .errorCode(4059)
  .statusCode(400)
  .errorReason(errorUniqueIds.PHONE_NUMBER_MINLENGTH_REACH)
  .version("1.0.0")
  .errorKey(PHONE_NUMBER_VALIDATION)
  .build();

const PHONE_NUMBER_MAXLENGTH_REACH = errorBuilder
  .create()
  .errorCode(4060)
  .statusCode(400)
  .errorReason(errorUniqueIds.PHONE_NUMBER_MAXLENGTH_REACH)
  .version("1.0.0")
  .errorKey(PHONE_NUMBER_VALIDATION)
  .build();

const PHONE_NUMBER_NUMERIC = errorBuilder
  .create()
  .errorCode(4060)
  .statusCode(400)
  .errorReason(errorUniqueIds.PHONE_NUMBER_NUMERIC)
  .version("1.0.0")
  .errorKey(PHONE_NUMBER_VALIDATION)
  .build();

const PRIVATE_ID_EXIST = errorBuilder
  .create()
  .errorCode(4061)
  .statusCode(400)
  .errorReason(errorUniqueIds.PRIVATE_ID_EXIST)
  .version("1.0.0")
  .errorKey(PRIVATE_ID_VALIDATION)
  .build();

const PRIVATE_ID_INVALID_TYPE = errorBuilder
  .create()
  .errorCode(4062)
  .statusCode(400)
  .errorReason(errorUniqueIds.PRIVATE_ID_INVALID_TYPE)
  .version("1.0.0")
  .errorKey(PRIVATE_ID_VALIDATION)
  .build();

const PRIVATE_ID_INVALID = errorBuilder
  .create()
  .errorCode(4065)
  .statusCode(400)
  .errorReason(errorUniqueIds.PRIVATE_ID_INVALID)
  .version("1.0.0")
  .errorKey(PRIVATE_ID_VALIDATION)
  .build();

const PRIVATE_ID_MAX_LENGTH_REACH = errorBuilder
  .create()
  .errorCode(4063)
  .statusCode(400)
  .errorReason(errorUniqueIds.PRIVATE_ID_MAX_LENGTH_REACH)
  .version("1.0.0")
  .errorKey(PRIVATE_ID_VALIDATION)
  .build();

const PRIVATE_ID_MIN_LENGTH_REACH = errorBuilder
  .create()
  .errorCode(4064)
  .statusCode(400)
  .errorReason(errorUniqueIds.PRIVATE_ID_MIN_LENGTH_REACH)
  .version("1.0.0")
  .errorKey(PRIVATE_ID_VALIDATION)
  .build();

const PRIVATE_ID_REQUIRED = errorBuilder
  .create()
  .errorCode(4065)
  .statusCode(400)
  .errorReason(errorUniqueIds.PRIVATE_ID_REQUIRED)
  .version("1.0.0")
  .errorKey(PRIVATE_ID_VALIDATION)
  .build();

const PRIVATE_ID_EMPTY = errorBuilder
  .create()
  .errorCode(4065)
  .statusCode(400)
  .errorReason(errorUniqueIds.PRIVATE_ID_EMPTY)
  .version("1.0.0")
  .errorKey(PRIVATE_ID_VALIDATION)
  .build();

const SELF_STUFF = errorBuilder
  .create()
  .errorCode(4066)
  .statusCode(400)
  .errorReason(errorUniqueIds.SELF_STUFF)
  .version("1.0.0")
  .errorKey(SELF_STUFF_VALIDATION)
  .build();

const TARGET_USER_NOT_EXIST = errorBuilder
  .create()
  .errorCode(4070)
  .statusCode(400)
  .errorReason(errorUniqueIds.TARGET_USER_NOT_EXIST)
  .version("1.0.0")
  .errorKey(TARGET_USER_VALIDATION)
  .build();

const TOKEN_EXIST = errorBuilder
  .create()
  .errorCode(4067)
  .statusCode(400)
  .errorReason(errorUniqueIds.TOKEN_EXIST)
  .version("1.0.0")
  .errorKey(TOKEN_VALIDATION)
  .build();

const TOKEN_REQUIRED = errorBuilder
  .create()
  .errorCode(4068)
  .statusCode(401)
  .errorReason(errorUniqueIds.TOKEN_REQUIRED)
  .version("1.0.0")
  .errorKey(TOKEN_VALIDATION)
  .build();

const TOKEN_INVALID = errorBuilder
  .create()
  .errorCode(4069)
  .statusCode(401)
  .errorReason(errorUniqueIds.TOKEN_INVALID)
  .version("1.0.0")
  .errorKey(TOKEN_VALIDATION)
  .build();

const TOKEN_CAN_NOT_VERIFIED = errorBuilder
  .create()
  .errorCode(4069)
  .statusCode(401)
  .errorReason(errorUniqueIds.TOKEN_CAN_NOT_VERIFIED)
  .version("1.0.0")
  .errorKey(TOKEN_VALIDATION)
  .build();

const TOKEN_INVALID_TYPE = errorBuilder
  .create()
  .errorCode(4069)
  .statusCode(401)
  .errorReason(errorUniqueIds.TOKEN_INVALID_TYPE)
  .version("1.0.0")
  .errorKey(TOKEN_VALIDATION)
  .build();

const USER_NOT_EXIST = errorBuilder
  .create()
  .errorCode(4070)
  .statusCode(400)
  .errorReason(errorUniqueIds.USER_NOT_EXIST)
  .version("1.0.0")
  .errorKey(USER_VALIDATION)
  .build();

const USERNAME_EMPTY = errorBuilder
  .create()
  .errorCode(4076)
  .statusCode(400)
  .errorReason(errorUniqueIds.USERNAME_EMPTY)
  .version("1.0.0")
  .errorKey(USERNAME_VALIDATION)
  .build();

const USERNAME_EXIST = errorBuilder
  .create()
  .errorCode(4071)
  .statusCode(400)
  .errorReason(errorUniqueIds.USERNAME_EXIST)
  .version("1.0.0")
  .errorKey(USERNAME_VALIDATION)
  .build();

const USERNAME_INVALID_TYPE = errorBuilder
  .create()
  .errorCode(4072)
  .statusCode(400)
  .errorReason(errorUniqueIds.USERNAME_INVALID_TYPE)
  .version("1.0.0")
  .errorKey(USERNAME_VALIDATION)
  .build();

const USERNAME_INVALID = errorBuilder
  .create()
  .errorCode(4072)
  .statusCode(400)
  .errorReason(errorUniqueIds.USERNAME_INVALID)
  .version("1.0.0")
  .errorKey(USERNAME_VALIDATION)
  .build();

const USERNAME_REQUIRED = errorBuilder
  .create()
  .errorCode(4072)
  .statusCode(400)
  .errorReason(errorUniqueIds.USERNAME_REQUIRED)
  .version("1.0.0")
  .errorKey(USERNAME_VALIDATION)
  .build();

const USERNAME_MAXLENGTH_REACH = errorBuilder
  .create()
  .errorCode(4073)
  .statusCode(400)
  .errorReason(errorUniqueIds.USERNAME_MAXLENGTH_REACH)
  .version("1.0.0")
  .errorKey(USERNAME_VALIDATION)
  .build();

const USERNAME_MINLENGTH_REACH = errorBuilder
  .create()
  .errorCode(4074)
  .statusCode(400)
  .errorReason(errorUniqueIds.USERNAME_MINLENGTH_REACH)
  .version("1.0.0")
  .errorKey(USERNAME_VALIDATION)
  .build();

const VERIFICATION_CODE_INVALID = errorBuilder
  .create()
  .errorCode(4075)
  .statusCode(400)
  .errorReason(errorUniqueIds.VERIFICATION_CODE_INVALID)
  .version("1.0.0")
  .errorKey(VERIFICATION_CODE_VALIDATION)
  .build();

const VERIFICATION_CODE_REQUIRED = errorBuilder
  .create()
  .errorCode(4075)
  .statusCode(400)
  .errorReason(errorUniqueIds.VERIFICATION_CODE_REQUIRED)
  .version("1.0.0")
  .errorKey(VERIFICATION_CODE_VALIDATION)
  .build();

const VERIFICATION_CODE_INVALID_TYPE = errorBuilder
  .create()
  .errorCode(4076)
  .statusCode(400)
  .errorReason(errorUniqueIds.VERIFICATION_CODE_INVALID_TYPE)
  .version("1.0.0")
  .errorKey(VERIFICATION_CODE_VALIDATION)
  .build();

const VERIFICATION_CODE_NUMERIC = errorBuilder
  .create()
  .errorCode(4076)
  .statusCode(400)
  .errorReason(errorUniqueIds.VERIFICATION_CODE_NUMERIC)
  .version("1.0.0")
  .errorKey(VERIFICATION_CODE_VALIDATION)
  .build();

const VERIFICATION_CODE_EMPTY = errorBuilder
  .create()
  .errorCode(4076)
  .statusCode(400)
  .errorReason(errorUniqueIds.VERIFICATION_CODE_EMPTY)
  .version("1.0.0")
  .errorKey(VERIFICATION_CODE_VALIDATION)
  .build();

const VERIFICATION_CODE_INVALID_LENGTH = errorBuilder
  .create()
  .errorCode(4077)
  .statusCode(400)
  .errorReason(errorUniqueIds.VERIFICATION_CODE_INVALID_LENGTH)
  .version("1.0.0")
  .errorKey(VERIFICATION_CODE_VALIDATION)
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
  LAST_NAME_EMPTY,
  LAST_NAME_INVALID,
  LAST_NAME_INVALID_TYPE,
  LAST_NAME_MAXLENGTH_REACH,
  LAST_NAME_MINLENGTH_REACH,
  MAC_ADDRESS_EMPTY,
  MAC_ADDRESS_EXIST,
  MAC_ADDRESS_INVALID_TYPE,
  MAC_ADDRESS_MAXLENGTH_REACH,
  MAC_ADDRESS_MINLENGTH_REACH,
  MAC_ADDRESS_REQUIRED,
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
  SELF_STUFF,
  TARGET_USER_NOT_EXIST,
  TOKEN_CAN_NOT_VERIFIED,
  TOKEN_EXIST,
  TOKEN_INVALID,
  TOKEN_INVALID_TYPE,
  TOKEN_REQUIRED,
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
