const { errorGenerator } = require("~/functions/utilities/generators");

const BLACKLIST_INVALID_TYPE = errorGenerator(
  4023,
  400,
  "",
  "BLACKLIST_INVALID_TYPE",
  "1.0.0"
);

const BIO_INVALID_TYPE = errorGenerator(
  4024,
  400,
  "",
  "BIO_INVALID_TYPE",
  "1.0.0"
);

const BIO_MAXLENGTH_REACH = errorGenerator(
  4025,
  400,
  "",
  "BIO_MAXLENGTH_REACH",
  "1.0.0"
);

const BIO_MINLENGTH_REACH = errorGenerator(
  4026,
  400,
  "",
  "BIO_MINLENGTH_REACH",
  "1.0.0"
);

const BLACKLIST_ITEM_EXIST = errorGenerator(
  4000,
  400,
  "blacklist item is already exist",
  "BLACKLIST_ITEM_EXIST",
  "1.0.0"
);

const BLACKLIST_ITEM_NOT_EXIST = errorGenerator(
  4000,
  400,
  "blacklist item is not exist",
  "BLACKLIST_ITEM_NOT_EXIST",
  "1.0.0"
);

const CELLPHONE_EXIST = errorGenerator(
  4027,
  400,
  "",
  "CELLPHONE_EXIST",
  "1.0.0"
);

const CELLPHONE_INVALID_TYPE = errorGenerator(
  4028,
  400,
  "",
  "CELLPHONE_INVALID_TYPE",
  "1.0.0"
);

const CELLPHONE_MAXLENGTH_REACH = errorGenerator(
  4029,
  400,
  "",
  "CELLPHONE_MAXLENGTH_REACH",
  "1.0.0"
);

const CELLPHONE_MINLENGTH_REACH = errorGenerator(
  4030,
  400,
  "",
  "CELLPHONE_MINLENGTH_REACH",
  "1.0.0"
);

const CELLPHONE_NOT_EXIST = errorGenerator(
  4031,
  400,
  "",
  "CELLPHONE_NOT_EXIST",
  "1.0.0"
);

const CELLPHONE_REQUIRED = errorGenerator(
  4032,
  400,
  "",
  "CELLPHONE_REQUIRED",
  "1.0.0"
);

const CELLPHONE_EXIST_IN_CONTACT = errorGenerator(
  4033,
  400,
  "",
  "CELLPHONE_EXIST_IN_CONTACT",
  "1.0.0"
);

const CONTACT_INVALID_TYPE = errorGenerator(
  4034,
  400,
  "",
  "CONTACT_INVALID_TYPE",
  "1.0.0"
);

const CONTACT_ITEM_EXIST = errorGenerator(
  4000,
  400,
  "Contact item is already exist",
  "CONTACT_ITEM_EXIST",
  "1.0.0"
);

const CONTACT_ITEM_NOT_EXIST = errorGenerator(
  4000,
  400,
  "Contact item is not exist",
  "CONTACT_ITEM_NOT_EXIST",
  "1.0.0"
);

const COUNTRY_CODE_INVALID_TYPE = errorGenerator(
  4035,
  400,
  "",
  "COUNTRY_CODE_INVALID_TYPE",
  "1.0.0"
);

const COUNTRY_CODE_MAXLENGTH_REACH = errorGenerator(
  4036,
  400,
  "",
  "COUNTRY_CODE_MAXLENGTH_REACH",
  "1.0.0"
);

const COUNTRY_CODE_MINLENGTH_REACH = errorGenerator(
  4037,
  400,
  "",
  "COUNTRY_CODE_MINLENGTH_REACH",
  "1.0.0"
);

const COUNTRY_CODE_REQUIRED = errorGenerator(
  4038,
  400,
  "",
  "COUNTRY_CODE_REQUIRED",
  "1.0.0"
);

const COUNTRY_NAME_INVALID_TYPE = errorGenerator(
  4039,
  400,
  "",
  "COUNTRY_NAME_INVALID_TYPE",
  "1.0.0"
);

const COUNTRY_NAME_MAXLENGTH_REACH = errorGenerator(
  4040,
  400,
  "",
  "COUNTRY_NAME_MAXLENGTH_REACH",
  "1.0.0"
);

const COUNTRY_NAME_MINLENGTH_REACH = errorGenerator(
  4041,
  400,
  "",
  "COUNTRY_NAME_MINLENGTH_REACH",
  "1.0.0"
);

const COUNTRY_NAME_REQUIRED = errorGenerator(
  4042,
  400,
  "",
  "COUNTRY_NAME_REQUIRED",
  "1.0.0"
);

const CREATED_AT_INVALID_TYPE = errorGenerator(
  4043,
  400,
  "",
  "CREATED_AT_INVALID_TYPE",
  "1.0.0"
);

const FIRST_NAME_INVALID_TYPE = errorGenerator(
  4044,
  400,
  "",
  "FIRST_NAME_INVALID_TYPE",
  "1.0.0"
);

const FIRST_NAME_MAXLENGTH_REACH = errorGenerator(
  4045,
  400,
  "",
  "FIRST_NAME_MAXLENGTH_REACH",
  "1.0.0"
);

const FIRST_NAME_MINLENGTH_REACH = errorGenerator(
  4046,
  400,
  "",
  "FIRST_NAME_MINLENGTH_REACH",
  "1.0.0"
);

const FIRST_NAME_REQUIRED = errorGenerator(
  4047,
  400,
  "",
  "FIRST_NAME_REQUIRED",
  "1.0.0"
);

const LAST_NAME_INVALID_TYPE = errorGenerator(
  4048,
  400,
  "",
  "LAST_NAME_INVALID_TYPE",
  "1.0.0"
);

const LAST_NAME_MAXLENGTH_REACH = errorGenerator(
  4049,
  400,
  "",
  "LAST_NAME_MAXLENGTH_REACH",
  "1.0.0"
);

const LAST_NAME_MINLENGTH_REACH = errorGenerator(
  4050,
  400,
  "",
  "LAST_NAME_MINLENGTH_REACH",
  "1.0.0"
);

const MAC_ADDRESS_EXIST = errorGenerator(
  4051,
  400,
  "",
  "MAC_ADDRESS_EXIST",
  "1.0.0"
);

const MAC_ADDRESS_INVALID_TYPE = errorGenerator(
  4052,
  400,
  "",
  "MAC_ADDRESS_INVALID_TYPE",
  "1.0.0"
);

const MAC_ADDRESS_MAXLENGTH_REACH = errorGenerator(
  4053,
  400,
  "",
  "MAC_ADDRESS_MAXLENGTH_REACH",
  "1.0.0"
);

const MAC_ADDRESS_MINLENGTH_REACH = errorGenerator(
  4054,
  400,
  "",
  "MAC_ADDRESS_MINLENGTH_REACH",
  "1.0.0"
);

const MAC_ADDRESS_REQUIRED = errorGenerator(
  4055,
  400,
  "",
  "MAC_ADDRESS_REQUIRED",
  "1.0.0"
);

const PHONE_NUMBER_INVALID_TYPE = errorGenerator(
  4056,
  400,
  "",
  "PHONE_NUMBER_INVALID_TYPE",
  "1.0.0"
);

const PHONE_NUMBER_EXIST = errorGenerator(
  4057,
  400,
  "",
  "PHONE_NUMBER_EXIST",
  "1.0.0"
);

const PHONE_NUMBER_REQUIRED = errorGenerator(
  4058,
  400,
  "",
  "PHONE_NUMBER_REQUIRED",
  "1.0.0"
);

const PHONE_NUMBER_MINLENGTH_REACH = errorGenerator(
  4059,
  400,
  "",
  "PHONE_NUMBER_MINLENGTH_REACH",
  "1.0.0"
);

const PHONE_NUMBER_MAXLENGTH_REACH = errorGenerator(
  4060,
  400,
  "",
  "PHONE_NUMBER_MAXLENGTH_REACH",
  "1.0.0"
);

const PRIVATE_ID_EXIST = errorGenerator(
  4061,
  400,
  "",
  "PRIVATE_ID_EXIST",
  "1.0.0"
);

const PRIVATE_ID_INVALID_TYPE = errorGenerator(
  4062,
  400,
  "",
  "PRIVATE_ID_INVALID_TYPE",
  "1.0.0"
);

const PRIVATE_ID_MAX_LENGTH_REACH = errorGenerator(
  4063,
  400,
  "",
  "PRIVATE_ID_MAX_LENGTH_REACH",
  "1.0.0"
);

const PRIVATE_ID_MIN_LENGTH_REACH = errorGenerator(
  4064,
  400,
  "",
  "PRIVATE_ID_MIN_LENGTH_REACH",
  "1.0.0"
);

const PRIVATE_ID_REQUIRED = errorGenerator(
  4065,
  400,
  "",
  "PRIVATE_ID_REQUIRED",
  "1.0.0"
);

const SELF_STUFF = errorGenerator(4066, 400, "", "SELF_STUFF", "1.0.0");

const TARGET_USER_NOT_EXIST = errorGenerator(
  4070,
  400,
  "target user not exist",
  "TARGET_USER_NOT_EXIST",
  "1.0.0"
);

const TOKEN_EXIST = errorGenerator(4067, 400, "", "TOKEN_EXIST", "1.0.0");

const TOKEN_REQUIRED = errorGenerator(4068, 400, "", "TOKEN_REQUIRED", "1.0.0");

const TOKEN_INVALID_TYPE = errorGenerator(
  4069,
  400,
  "",
  "TOKEN_INVALID_TYPE",
  "1.0.0"
);

const USER_NOT_EXIST = errorGenerator(
  4070,
  400,
  "user not exist",
  "USER_NOT_EXIST",
  "1.0.0"
);

const USERNAME_EXIST = errorGenerator(4071, 400, "", "USERNAME_EXIST", "1.0.0");

const USERNAME_INVALID_TYPE = errorGenerator(
  4072,
  400,
  "",
  "USERNAME_INVALID_TYPE",
  "1.0.0"
);

const USERNAME_MAXLENGTH_REACH = errorGenerator(
  4073,
  400,
  "",
  "USERNAME_MAXLENGTH_REACH",
  "1.0.0"
);

const USERNAME_MINLENGTH_REACH = errorGenerator(
  4074,
  400,
  "",
  "USERNAME_MINLENGTH_REACH",
  "1.0.0"
);

const VERIFICATION_CODE_INVALID = errorGenerator(
  4075,
  400,
  "Wrong verification code",
  "VERIFICATION_CODE_INVALID",
  "1.0.0"
);

const VERIFICATION_CODE_INVALID_TYPE = errorGenerator(
  4076,
  400,
  "",
  "VERIFICATION_CODE_INVALID_TYPE",
  "1.0.0"
);

const VERIFICATION_CODE_INVALID_LENGTH = errorGenerator(
  4077,
  400,
  "",
  "VERIFICATION_CODE_INVALID_LENGTH",
  "1.0.0"
);

const userErrors = {
  info: { version: "1.0.0" },

  properties: {
    BIO_INVALID_TYPE,
    BIO_MAXLENGTH_REACH,
    BIO_MINLENGTH_REACH,
    BLACKLIST_INVALID_TYPE,
    BLACKLIST_ITEM_EXIST,
    BLACKLIST_ITEM_NOT_EXIST,
    CELLPHONE_EXIST_IN_CONTACT,
    CELLPHONE_EXIST,
    CELLPHONE_INVALID_TYPE,
    CELLPHONE_MAXLENGTH_REACH,
    CELLPHONE_MINLENGTH_REACH,
    CELLPHONE_NOT_EXIST,
    CELLPHONE_REQUIRED,
    CONTACT_INVALID_TYPE,
    CONTACT_ITEM_EXIST,
    CONTACT_ITEM_NOT_EXIST,
    COUNTRY_CODE_INVALID_TYPE,
    COUNTRY_CODE_MAXLENGTH_REACH,
    COUNTRY_CODE_MINLENGTH_REACH,
    COUNTRY_CODE_REQUIRED,
    COUNTRY_NAME_INVALID_TYPE,
    COUNTRY_NAME_MAXLENGTH_REACH,
    COUNTRY_NAME_MINLENGTH_REACH,
    COUNTRY_NAME_REQUIRED,
    CREATED_AT_INVALID_TYPE,
    FIRST_NAME_INVALID_TYPE,
    FIRST_NAME_MAXLENGTH_REACH,
    FIRST_NAME_MINLENGTH_REACH,
    FIRST_NAME_REQUIRED,
    LAST_NAME_INVALID_TYPE,
    LAST_NAME_MAXLENGTH_REACH,
    LAST_NAME_MINLENGTH_REACH,
    MAC_ADDRESS_EXIST,
    MAC_ADDRESS_INVALID_TYPE,
    MAC_ADDRESS_MAXLENGTH_REACH,
    MAC_ADDRESS_MINLENGTH_REACH,
    MAC_ADDRESS_REQUIRED,
    PHONE_NUMBER_EXIST,
    PHONE_NUMBER_INVALID_TYPE,
    PHONE_NUMBER_MAXLENGTH_REACH,
    PHONE_NUMBER_MINLENGTH_REACH,
    PHONE_NUMBER_REQUIRED,
    PRIVATE_ID_EXIST,
    PRIVATE_ID_INVALID_TYPE,
    PRIVATE_ID_MAX_LENGTH_REACH,
    PRIVATE_ID_MIN_LENGTH_REACH,
    PRIVATE_ID_REQUIRED,
    SELF_STUFF,
    TARGET_USER_NOT_EXIST,
    TOKEN_EXIST,
    TOKEN_INVALID_TYPE,
    TOKEN_REQUIRED,
    USER_NOT_EXIST,
    USERNAME_EXIST,
    USERNAME_INVALID_TYPE,
    USERNAME_MAXLENGTH_REACH,
    USERNAME_MINLENGTH_REACH,
    VERIFICATION_CODE_INVALID_LENGTH,
    VERIFICATION_CODE_INVALID_TYPE,
    VERIFICATION_CODE_INVALID,
  },
};

module.exports = {
  userErrors,
};
