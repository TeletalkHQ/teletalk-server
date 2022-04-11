const {
  modelPropertyGenerator,
  modelGenerator,
} = require("~/functions/utilities/generators");
const { skipParams } = require("~/functions/utilities/utils");

const { commonModel } = require("~/models/commonModels/common.model");

const {
  userErrorTemplate: {
    BIO_INVALID_TYPE: { properties: BIO_INVALID_TYPE },
    BIO_MAXLENGTH_REACH: { properties: BIO_MAXLENGTH_REACH },
    BIO_MINLENGTH_REACH: { properties: BIO_MINLENGTH_REACH },
    BLACKLIST_INVALID_TYPE: { properties: BLACKLIST_INVALID_TYPE },
    CONTACT_INVALID_TYPE: { properties: CONTACT_INVALID_TYPE },
    COUNTRY_CODE_INVALID_TYPE: { properties: COUNTRY_CODE_INVALID_TYPE },
    COUNTRY_CODE_MAXLENGTH_REACH: { properties: COUNTRY_CODE_MAXLENGTH_REACH },
    COUNTRY_CODE_MINLENGTH_REACH: { properties: COUNTRY_CODE_MINLENGTH_REACH },
    COUNTRY_CODE_REQUIRED: { properties: COUNTRY_CODE_REQUIRED },
    COUNTRY_NAME_INVALID_TYPE: { properties: COUNTRY_NAME_INVALID_TYPE },
    COUNTRY_NAME_MAXLENGTH_REACH: { properties: COUNTRY_NAME_MAXLENGTH_REACH },
    COUNTRY_NAME_MINLENGTH_REACH: { properties: COUNTRY_NAME_MINLENGTH_REACH },
    COUNTRY_NAME_REQUIRED: { properties: COUNTRY_NAME_REQUIRED },
    FIRST_NAME_INVALID_TYPE: { properties: FIRST_NAME_INVALID_TYPE },
    FIRST_NAME_MAXLENGTH_REACH: { properties: FIRST_NAME_MAXLENGTH_REACH },
    FIRST_NAME_MINLENGTH_REACH: { properties: FIRST_NAME_MINLENGTH_REACH },
    FIRST_NAME_REQUIRED: { properties: FIRST_NAME_REQUIRED },
    LAST_NAME_INVALID_TYPE: { properties: LAST_NAME_INVALID_TYPE },
    LAST_NAME_MAXLENGTH_REACH: { properties: LAST_NAME_MAXLENGTH_REACH },
    LAST_NAME_MINLENGTH_REACH: { properties: LAST_NAME_MINLENGTH_REACH },
    MAC_ADDRESS_EXIST: { properties: MAC_ADDRESS_EXIST },
    MAC_ADDRESS_INVALID_TYPE: { properties: MAC_ADDRESS_INVALID_TYPE },
    MAC_ADDRESS_MAXLENGTH_REACH: { properties: MAC_ADDRESS_MAXLENGTH_REACH },
    MAC_ADDRESS_MINLENGTH_REACH: { properties: MAC_ADDRESS_MINLENGTH_REACH },
    MAC_ADDRESS_REQUIRED: { properties: MAC_ADDRESS_REQUIRED },
    PHONE_NUMBER_EXIST: { properties: PHONE_NUMBER_EXIST },
    PHONE_NUMBER_INVALID_TYPE: { properties: PHONE_NUMBER_INVALID_TYPE },
    PHONE_NUMBER_MAXLENGTH_REACH: { properties: PHONE_NUMBER_MAXLENGTH_REACH },
    PHONE_NUMBER_MINLENGTH_REACH: { properties: PHONE_NUMBER_MINLENGTH_REACH },
    PHONE_NUMBER_REQUIRED: { properties: PHONE_NUMBER_REQUIRED },
    PRIVATE_ID_EXIST: { properties: PRIVATE_ID_EXIST },
    PRIVATE_ID_INVALID_TYPE: { properties: PRIVATE_ID_INVALID_TYPE },
    PRIVATE_ID_MAX_LENGTH_REACH: { properties: PRIVATE_ID_MAX_LENGTH_REACH },
    PRIVATE_ID_MIN_LENGTH_REACH: { properties: PRIVATE_ID_MIN_LENGTH_REACH },
    PRIVATE_ID_REQUIRED: { properties: PRIVATE_ID_REQUIRED },
    TOKEN_EXIST: { properties: TOKEN_EXIST },
    TOKEN_INVALID_TYPE: { properties: TOKEN_INVALID_TYPE },
    TOKEN_REQUIRED: { properties: TOKEN_REQUIRED },
    USERNAME_EXIST: { properties: USERNAME_EXIST },
    USERNAME_INVALID_TYPE: { properties: USERNAME_INVALID_TYPE },
    USERNAME_MAXLENGTH_REACH: { properties: USERNAME_MAXLENGTH_REACH },
    USERNAME_MINLENGTH_REACH: { properties: USERNAME_MINLENGTH_REACH },
    VERIFICATION_CODE_INVALID_LENGTH: {
      properties: VERIFICATION_CODE_INVALID_LENGTH,
    },
    VERIFICATION_CODE_INVALID_TYPE: {
      properties: VERIFICATION_CODE_INVALID_TYPE,
    },
  },
} = require("~/variables/errors/userErrorTemplate");

const bio = modelGenerator(
  modelPropertyGenerator(255, BIO_MAXLENGTH_REACH),
  modelPropertyGenerator(1, BIO_MINLENGTH_REACH),
  modelPropertyGenerator(false),
  null,
  modelPropertyGenerator("string", BIO_INVALID_TYPE),
  null,
  modelPropertyGenerator(""),
  "1.0.0"
);

const blacklist = modelGenerator(
  ...skipParams(4),
  modelPropertyGenerator("array", BLACKLIST_INVALID_TYPE),
  null,
  modelPropertyGenerator([]),
  "1.0.0"
);

const contacts = modelGenerator(
  modelPropertyGenerator(14),
  modelPropertyGenerator(10),
  modelPropertyGenerator(false),
  null,
  modelPropertyGenerator("array", CONTACT_INVALID_TYPE),
  null,
  modelPropertyGenerator([]),
  "1.0.0"
);

const countryCode = modelGenerator(
  modelPropertyGenerator(8, COUNTRY_CODE_MAXLENGTH_REACH),
  modelPropertyGenerator(2, COUNTRY_CODE_MINLENGTH_REACH),
  modelPropertyGenerator(true, COUNTRY_CODE_REQUIRED),
  modelPropertyGenerator(true),
  modelPropertyGenerator("string", COUNTRY_CODE_INVALID_TYPE),
  ...skipParams(2),
  "1.0.0"
);

const countryName = modelGenerator(
  modelPropertyGenerator(32, COUNTRY_NAME_MAXLENGTH_REACH),
  modelPropertyGenerator(2, COUNTRY_NAME_MINLENGTH_REACH),
  modelPropertyGenerator(true, COUNTRY_NAME_REQUIRED),
  null,
  modelPropertyGenerator("string", COUNTRY_NAME_INVALID_TYPE),
  ...skipParams(2),
  "1.0.0"
);

const createdAt = commonModel.createdAt;

const firstName = modelGenerator(
  modelPropertyGenerator(18, FIRST_NAME_MAXLENGTH_REACH),
  modelPropertyGenerator(1, FIRST_NAME_MINLENGTH_REACH),
  modelPropertyGenerator(true, FIRST_NAME_REQUIRED),
  modelPropertyGenerator(false),
  modelPropertyGenerator("string", FIRST_NAME_INVALID_TYPE),
  skipParams(2),

  "1.0.0"
);

const lastName = modelGenerator(
  modelPropertyGenerator(18, LAST_NAME_MAXLENGTH_REACH),
  modelPropertyGenerator(1, LAST_NAME_MINLENGTH_REACH),
  [false],
  modelPropertyGenerator(false),
  modelPropertyGenerator("string", LAST_NAME_INVALID_TYPE),
  null,
  modelPropertyGenerator(""),
  "1.0.0"
);

const macAddress = modelGenerator(
  modelPropertyGenerator(16, MAC_ADDRESS_MAXLENGTH_REACH),
  modelPropertyGenerator(12, MAC_ADDRESS_MINLENGTH_REACH),
  modelPropertyGenerator(true, MAC_ADDRESS_REQUIRED),
  modelPropertyGenerator(true),
  modelPropertyGenerator("string", MAC_ADDRESS_INVALID_TYPE),
  modelPropertyGenerator(true, MAC_ADDRESS_EXIST),
  null,
  "1.0.0"
);

const phoneNumber = modelGenerator(
  modelPropertyGenerator(14, PHONE_NUMBER_MAXLENGTH_REACH),
  modelPropertyGenerator(10, PHONE_NUMBER_MINLENGTH_REACH),
  modelPropertyGenerator(true, PHONE_NUMBER_REQUIRED),
  null,
  modelPropertyGenerator("string", PHONE_NUMBER_INVALID_TYPE),
  modelPropertyGenerator(true, PHONE_NUMBER_EXIST),
  null,
  "1.0.0"
);

const privateID = modelGenerator(
  modelPropertyGenerator(35, PRIVATE_ID_MAX_LENGTH_REACH),
  modelPropertyGenerator(30, PRIVATE_ID_MIN_LENGTH_REACH),
  modelPropertyGenerator(true, PRIVATE_ID_REQUIRED),
  modelPropertyGenerator(true),
  modelPropertyGenerator("string", PRIVATE_ID_INVALID_TYPE),
  modelPropertyGenerator(true, PRIVATE_ID_EXIST),
  null,
  "1.0.0"
);

const token = modelGenerator(
  ...skipParams(2),
  modelPropertyGenerator(true, TOKEN_REQUIRED),
  null,
  modelPropertyGenerator("string", TOKEN_INVALID_TYPE),
  modelPropertyGenerator(true, TOKEN_EXIST),
  null,
  "1.0.0"
);

const username = modelGenerator(
  modelPropertyGenerator(12, USERNAME_MAXLENGTH_REACH),
  modelPropertyGenerator(4, USERNAME_MINLENGTH_REACH),
  modelPropertyGenerator(false),
  modelPropertyGenerator(true),
  modelPropertyGenerator("string", USERNAME_INVALID_TYPE),
  modelPropertyGenerator(false, USERNAME_EXIST),
  modelPropertyGenerator(""),
  "1.0.0",
  modelPropertyGenerator(true)
);

const verificationCode = modelGenerator(
  ...skipParams(3),
  modelPropertyGenerator(true),
  modelPropertyGenerator("string", VERIFICATION_CODE_INVALID_TYPE),
  ...skipParams(2),
  "1.0.0",
  null,
  modelPropertyGenerator(6, VERIFICATION_CODE_INVALID_LENGTH)
);

const userModel = {
  version: "1.0.0",

  bio,
  blacklist,
  contacts,
  countryCode,
  countryName,
  createdAt,
  firstName,
  lastName,
  macAddress,
  phoneNumber,
  privateID,
  token,
  username,
  verificationCode,
};

module.exports = {
  userModel,
};
