const {
  modelPropertyGenerator,
  modelGenerator,
} = require("@/functions/utilities/generators");
const { skipParams } = require("@/functions/utilities/utilsNoDeps");

const {
  commonModels: {
    properties: { createdAtCommonModel, privateIdCommonModel },
  },
} = require("@/models/commonModels/commonModels");

const {
  userErrors: {
    properties: {
      BIO_INVALID_TYPE: { properties: BIO_INVALID_TYPE },
      BIO_MAXLENGTH_REACH: { properties: BIO_MAXLENGTH_REACH },
      BIO_MINLENGTH_REACH: { properties: BIO_MINLENGTH_REACH },
      BLACKLIST_INVALID_TYPE: { properties: BLACKLIST_INVALID_TYPE },
      CONTACT_INVALID_TYPE: { properties: CONTACT_INVALID_TYPE },
      COUNTRY_CODE_INVALID_TYPE: { properties: COUNTRY_CODE_INVALID_TYPE },
      COUNTRY_CODE_NUMERIC: { properties: COUNTRY_CODE_NUMERIC },
      COUNTRY_CODE_MAXLENGTH_REACH: {
        properties: COUNTRY_CODE_MAXLENGTH_REACH,
      },
      COUNTRY_CODE_MINLENGTH_REACH: {
        properties: COUNTRY_CODE_MINLENGTH_REACH,
      },
      COUNTRY_CODE_REQUIRED: { properties: COUNTRY_CODE_REQUIRED },
      COUNTRY_NAME_INVALID_TYPE: { properties: COUNTRY_NAME_INVALID_TYPE },
      COUNTRY_NAME_MAXLENGTH_REACH: {
        properties: COUNTRY_NAME_MAXLENGTH_REACH,
      },
      COUNTRY_NAME_MINLENGTH_REACH: {
        properties: COUNTRY_NAME_MINLENGTH_REACH,
      },
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
      PHONE_NUMBER_MAXLENGTH_REACH: {
        properties: PHONE_NUMBER_MAXLENGTH_REACH,
      },
      PHONE_NUMBER_MINLENGTH_REACH: {
        properties: PHONE_NUMBER_MINLENGTH_REACH,
      },
      PHONE_NUMBER_NUMERIC: { properties: PHONE_NUMBER_NUMERIC },
      PHONE_NUMBER_REQUIRED: { properties: PHONE_NUMBER_REQUIRED },
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
      VERIFICATION_CODE_NUMERIC: { properties: VERIFICATION_CODE_NUMERIC },
      VERIFICATION_CODE_EMPTY: { properties: VERIFICATION_CODE_EMPTY },
    },
  },
} = require("@/variables/errors/userErrors");

const bioModel = modelGenerator(
  modelPropertyGenerator(255, BIO_MAXLENGTH_REACH),
  modelPropertyGenerator(1, BIO_MINLENGTH_REACH),
  modelPropertyGenerator(false),
  null,
  modelPropertyGenerator("string", BIO_INVALID_TYPE),
  null,
  modelPropertyGenerator(""),
  "1.0.0"
);

const blacklistModel = modelGenerator(
  ...skipParams(4),
  modelPropertyGenerator("array", BLACKLIST_INVALID_TYPE),
  null,
  modelPropertyGenerator([]),
  "1.0.0"
);

const contactsModel = modelGenerator(
  modelPropertyGenerator(14),
  modelPropertyGenerator(10),
  modelPropertyGenerator(false),
  null,
  modelPropertyGenerator("array", CONTACT_INVALID_TYPE),
  null,
  modelPropertyGenerator([]),
  "1.0.0"
);

const countryCodeModel = modelGenerator(
  modelPropertyGenerator(8, COUNTRY_CODE_MAXLENGTH_REACH),
  modelPropertyGenerator(2, COUNTRY_CODE_MINLENGTH_REACH),
  modelPropertyGenerator(true, COUNTRY_CODE_REQUIRED),
  modelPropertyGenerator(true),
  modelPropertyGenerator("string", COUNTRY_CODE_INVALID_TYPE),
  ...skipParams(2),
  "1.0.0",
  ...skipParams(2),
  modelPropertyGenerator(true, COUNTRY_CODE_NUMERIC)
);

const countryNameModel = modelGenerator(
  modelPropertyGenerator(32, COUNTRY_NAME_MAXLENGTH_REACH),
  modelPropertyGenerator(2, COUNTRY_NAME_MINLENGTH_REACH),
  modelPropertyGenerator(true, COUNTRY_NAME_REQUIRED),
  null,
  modelPropertyGenerator("string", COUNTRY_NAME_INVALID_TYPE),
  ...skipParams(2),
  "1.0.0"
);

const createdAtModel = createdAtCommonModel;
const privateIdModel = privateIdCommonModel;

const firstNameModel = modelGenerator(
  modelPropertyGenerator(18, FIRST_NAME_MAXLENGTH_REACH),
  modelPropertyGenerator(1, FIRST_NAME_MINLENGTH_REACH),
  modelPropertyGenerator(true, FIRST_NAME_REQUIRED),
  modelPropertyGenerator(false),
  modelPropertyGenerator("string", FIRST_NAME_INVALID_TYPE),
  skipParams(2),
  "1.0.0"
);

const lastNameModel = modelGenerator(
  modelPropertyGenerator(18, LAST_NAME_MAXLENGTH_REACH),
  modelPropertyGenerator(1, LAST_NAME_MINLENGTH_REACH),
  modelPropertyGenerator(false, {}),
  modelPropertyGenerator(false),
  modelPropertyGenerator("string", LAST_NAME_INVALID_TYPE),
  null,
  modelPropertyGenerator(""),
  "1.0.0"
);

const macAddressModel = modelGenerator(
  modelPropertyGenerator(16, MAC_ADDRESS_MAXLENGTH_REACH),
  modelPropertyGenerator(12, MAC_ADDRESS_MINLENGTH_REACH),
  modelPropertyGenerator(true, MAC_ADDRESS_REQUIRED),
  modelPropertyGenerator(true),
  modelPropertyGenerator("string", MAC_ADDRESS_INVALID_TYPE),
  modelPropertyGenerator(true, MAC_ADDRESS_EXIST),
  null,
  "1.0.0"
);

const phoneNumberModel = modelGenerator(
  modelPropertyGenerator(14, PHONE_NUMBER_MAXLENGTH_REACH),
  modelPropertyGenerator(10, PHONE_NUMBER_MINLENGTH_REACH),
  modelPropertyGenerator(true, PHONE_NUMBER_REQUIRED),
  null,
  modelPropertyGenerator("string", PHONE_NUMBER_INVALID_TYPE),
  modelPropertyGenerator(true, PHONE_NUMBER_EXIST),
  null,
  "1.0.0",
  null,
  null,
  modelPropertyGenerator(true, PHONE_NUMBER_NUMERIC)
);

const tokenModel = modelGenerator(
  ...skipParams(2),
  modelPropertyGenerator(true, TOKEN_REQUIRED),
  null,
  modelPropertyGenerator("string", TOKEN_INVALID_TYPE),
  modelPropertyGenerator(true, TOKEN_EXIST),
  null,
  "1.0.0"
);

const usernameModel = modelGenerator(
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

const verificationCodeModel = modelGenerator(
  null,
  null,
  null,
  modelPropertyGenerator(true),
  modelPropertyGenerator("string", VERIFICATION_CODE_INVALID_TYPE),
  null,
  null,
  "1.0.0",
  null,
  modelPropertyGenerator(6, VERIFICATION_CODE_INVALID_LENGTH),
  modelPropertyGenerator(true, VERIFICATION_CODE_NUMERIC),
  modelPropertyGenerator(false, VERIFICATION_CODE_EMPTY)
);

const userModels = {
  info: {
    version: "1.0.0",
  },

  properties: {
    bioModel,
    blacklistModel,
    contactsModel,
    countryCodeModel,
    countryNameModel,
    createdAtModel,
    firstNameModel,
    lastNameModel,
    macAddressModel,
    phoneNumberModel,
    privateIdModel,
    tokenModel,
    usernameModel,
    verificationCodeModel,
  },
};

module.exports = {
  userModels,
};
