const { modelPropertyGenerator } = require("@/functions/utilities/generators");
const {
  versionCalculator,

  extractVersions,
} = require("@/functions/utilities/utils");

const {
  commonModels: { createdAtCommonModel, privateIdCommonModel },
} = require("@/models/commonModels/commonModels");

const {
  userErrors: {
    BIO_EMPTY,
    BIO_INVALID_TYPE,
    BIO_MAXLENGTH_REACH,
    BIO_MINLENGTH_REACH,
    BLACKLIST_INVALID_TYPE,
    CHATS_INVALID_TYPE,
    CONTACT_INVALID_TYPE,
    COUNTRY_CODE_EMPTY,
    COUNTRY_CODE_INVALID_TYPE,
    COUNTRY_CODE_MAXLENGTH_REACH,
    COUNTRY_CODE_MINLENGTH_REACH,
    COUNTRY_CODE_NUMERIC,
    COUNTRY_CODE_REQUIRED,
    COUNTRY_NAME_EMPTY,
    COUNTRY_NAME_INVALID_TYPE,
    COUNTRY_NAME_MAXLENGTH_REACH,
    COUNTRY_NAME_MINLENGTH_REACH,
    COUNTRY_NAME_REQUIRED,
    FIRST_NAME_EMPTY,
    FIRST_NAME_INVALID_TYPE,
    FIRST_NAME_MAXLENGTH_REACH,
    FIRST_NAME_MINLENGTH_REACH,
    FIRST_NAME_REQUIRED,
    LAST_NAME_EMPTY,
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
    PHONE_NUMBER_INVALID_TYPE,
    PHONE_NUMBER_MAXLENGTH_REACH,
    PHONE_NUMBER_MINLENGTH_REACH,
    PHONE_NUMBER_NUMERIC,
    PHONE_NUMBER_REQUIRED,
    TOKEN_EXIST,
    TOKEN_INVALID_TYPE,
    TOKEN_REQUIRED,
    USERNAME_EMPTY,
    USERNAME_EXIST,
    USERNAME_INVALID_TYPE,
    USERNAME_MAXLENGTH_REACH,
    USERNAME_MINLENGTH_REACH,
    VERIFICATION_CODE_EMPTY,
    VERIFICATION_CODE_INVALID_LENGTH,
    VERIFICATION_CODE_INVALID_TYPE,
    VERIFICATION_CODE_NUMERIC,
  },
} = require("@/variables/errors/userErrors");

const bioModel = {
  defaultValue: modelPropertyGenerator(""),
  empty: modelPropertyGenerator(false, BIO_EMPTY),
  maxlength: modelPropertyGenerator(255, BIO_MAXLENGTH_REACH),
  minlength: modelPropertyGenerator(2, BIO_MINLENGTH_REACH),
  required: modelPropertyGenerator(false),
  type: modelPropertyGenerator("string", BIO_INVALID_TYPE),
  version: "1.0.0",
};

const blacklistModel = {
  defaultValue: modelPropertyGenerator([]),
  type: modelPropertyGenerator("array", BLACKLIST_INVALID_TYPE),
  version: "1.0.0",
};

const contactsModel = {
  defaultValue: modelPropertyGenerator([]),
  maxlength: modelPropertyGenerator(14),
  minlength: modelPropertyGenerator(10),
  required: modelPropertyGenerator(false),
  type: modelPropertyGenerator("array", CONTACT_INVALID_TYPE),
  version: "1.0.0",
};

const countryCodeModel = {
  empty: modelPropertyGenerator(false, COUNTRY_CODE_EMPTY),
  maxlength: modelPropertyGenerator(8, COUNTRY_CODE_MAXLENGTH_REACH),
  minlength: modelPropertyGenerator(2, COUNTRY_CODE_MINLENGTH_REACH), //TODO Fix me! i should be '1'!
  numeric: modelPropertyGenerator(true, COUNTRY_CODE_NUMERIC),
  required: modelPropertyGenerator(true, COUNTRY_CODE_REQUIRED),
  trim: modelPropertyGenerator(true),
  type: modelPropertyGenerator("string", COUNTRY_CODE_INVALID_TYPE),
  version: "1.0.0",
};

const countryNameModel = {
  empty: modelPropertyGenerator(false, COUNTRY_NAME_EMPTY),
  maxlength: modelPropertyGenerator(40, COUNTRY_NAME_MAXLENGTH_REACH),
  minlength: modelPropertyGenerator(2, COUNTRY_NAME_MINLENGTH_REACH),
  required: modelPropertyGenerator(true, COUNTRY_NAME_REQUIRED),
  type: modelPropertyGenerator("string", COUNTRY_NAME_INVALID_TYPE),
  version: "1.0.0",
};

const chatsModel = {
  type: modelPropertyGenerator("array", CHATS_INVALID_TYPE),
  version: "1.0.0",
};

const createdAtModel = createdAtCommonModel;
const privateIdModel = privateIdCommonModel;

const firstNameModel = {
  empty: modelPropertyGenerator(false, FIRST_NAME_EMPTY),
  maxlength: modelPropertyGenerator(18, FIRST_NAME_MAXLENGTH_REACH),
  minlength: modelPropertyGenerator(2, FIRST_NAME_MINLENGTH_REACH),
  required: modelPropertyGenerator(true, FIRST_NAME_REQUIRED),
  trim: modelPropertyGenerator(false),
  type: modelPropertyGenerator("string", FIRST_NAME_INVALID_TYPE),
  version: "1.0.0",
};

const lastNameModel = {
  defaultValue: modelPropertyGenerator(""),
  empty: modelPropertyGenerator(false, LAST_NAME_EMPTY),
  maxlength: modelPropertyGenerator(18, LAST_NAME_MAXLENGTH_REACH),
  minlength: modelPropertyGenerator(2, LAST_NAME_MINLENGTH_REACH),
  required: modelPropertyGenerator(false, {}),
  trim: modelPropertyGenerator(false),
  type: modelPropertyGenerator("string", LAST_NAME_INVALID_TYPE),
  version: "1.0.0",
};

const macAddressModel = {
  empty: modelPropertyGenerator(false, MAC_ADDRESS_EMPTY),
  maxlength: modelPropertyGenerator(16, MAC_ADDRESS_MAXLENGTH_REACH),
  minlength: modelPropertyGenerator(12, MAC_ADDRESS_MINLENGTH_REACH),
  required: modelPropertyGenerator(true, MAC_ADDRESS_REQUIRED),
  trim: modelPropertyGenerator(true),
  type: modelPropertyGenerator("string", MAC_ADDRESS_INVALID_TYPE),
  unique: modelPropertyGenerator(true, MAC_ADDRESS_EXIST),
  version: "1.0.0",
};

const phoneNumberModel = {
  empty: modelPropertyGenerator(false, PHONE_NUMBER_EMPTY),
  maxlength: modelPropertyGenerator(14, PHONE_NUMBER_MAXLENGTH_REACH),
  minlength: modelPropertyGenerator(10, PHONE_NUMBER_MINLENGTH_REACH),
  numeric: modelPropertyGenerator(true, PHONE_NUMBER_NUMERIC),
  required: modelPropertyGenerator(true, PHONE_NUMBER_REQUIRED),
  type: modelPropertyGenerator("string", PHONE_NUMBER_INVALID_TYPE),
  unique: modelPropertyGenerator(true, PHONE_NUMBER_EXIST),
  version: "1.0.0",
};

const tokenModel = {
  required: modelPropertyGenerator(true, TOKEN_REQUIRED),
  type: modelPropertyGenerator("string", TOKEN_INVALID_TYPE),
  unique: modelPropertyGenerator(true, TOKEN_EXIST),
  version: "1.0.0",
};

const usernameModel = {
  defaultValue: modelPropertyGenerator(""),
  empty: modelPropertyGenerator(false, USERNAME_EMPTY),
  lowercase: modelPropertyGenerator(true),
  maxlength: modelPropertyGenerator(12, USERNAME_MAXLENGTH_REACH),
  minlength: modelPropertyGenerator(4, USERNAME_MINLENGTH_REACH),
  required: modelPropertyGenerator(false),
  trim: modelPropertyGenerator(true),
  type: modelPropertyGenerator("string", USERNAME_INVALID_TYPE),
  unique: modelPropertyGenerator(false, USERNAME_EXIST),
  version: "1.0.0",
};

const verificationCodeModel = {
  empty: modelPropertyGenerator(false, VERIFICATION_CODE_EMPTY),
  length: modelPropertyGenerator(6, VERIFICATION_CODE_INVALID_LENGTH),
  numeric: modelPropertyGenerator(true, VERIFICATION_CODE_NUMERIC),
  trim: modelPropertyGenerator(true),
  type: modelPropertyGenerator("string", VERIFICATION_CODE_INVALID_TYPE),
  version: "1.0.0",
};

const models = {
  bioModel,
  blacklistModel,
  chatsModel,
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
};

const userModels = {
  version: versionCalculator(extractVersions(models)),
  ...models,
};

module.exports = {
  userModels,
};
