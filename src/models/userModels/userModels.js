const { modelBuilder } = require("@/classes/ModelBuilder");
const {
  versionCalculator,

  extractVersions,
} = require("@/functions/utilities/utilities");

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
    TOKEN_MAXLENGTH_REACH,
    TOKEN_MINLENGTH_REACH,
    TOKEN_REQUIRED,
    USERNAME_EMPTY,
    USERNAME_EXIST,
    USERNAME_INVALID_TYPE,
    USERNAME_MAXLENGTH_REACH,
    USERNAME_MINLENGTH_REACH,
    VERIFICATION_CODE_EMPTY,
    VERIFICATION_CODE_INVALID_LENGTH,
    VERIFICATION_CODE_INVALID_TYPE,
    VERIFICATION_CODE_MAXLENGTH_REACH,
    VERIFICATION_CODE_NUMERIC,
  },
} = require("@/variables/errors/userErrors");

const bioModel = modelBuilder
  .create()
  .defaultValue("")
  .empty(false, BIO_EMPTY)
  .maxlength(255, BIO_MAXLENGTH_REACH)
  .minlength(2, BIO_MINLENGTH_REACH)
  .required(false)
  .type("string", BIO_INVALID_TYPE)
  .version("1.0.0")
  .build();

const blacklistModel = modelBuilder
  .create()
  .defaultValue([])
  .type("array", BLACKLIST_INVALID_TYPE)
  .version("1.0.0")
  .build();

const contactsModel = modelBuilder
  .create()
  .defaultValue([])
  .maxlength(14)
  .minlength(10)
  .required(false)
  .type("array", CONTACT_INVALID_TYPE)
  .version("1.0.0")
  .build();

const countryCodeModel = modelBuilder
  .create()
  .empty(false, COUNTRY_CODE_EMPTY)
  .maxlength(4, COUNTRY_CODE_MAXLENGTH_REACH)
  .minlength(1, COUNTRY_CODE_MINLENGTH_REACH)
  .numeric(true, COUNTRY_CODE_NUMERIC)
  .required(true, COUNTRY_CODE_REQUIRED)
  .trim(true)
  .type("string", COUNTRY_CODE_INVALID_TYPE)
  .version("1.0.0")
  .build();

const countryNameModel = modelBuilder
  .create()
  .empty(false, COUNTRY_NAME_EMPTY)
  .maxlength(50, COUNTRY_NAME_MAXLENGTH_REACH)
  .minlength(2, COUNTRY_NAME_MINLENGTH_REACH)
  .required(true, COUNTRY_NAME_REQUIRED)
  .type("string", COUNTRY_NAME_INVALID_TYPE)
  .version("1.0.0")
  .build();

const chatsModel = modelBuilder
  .create()
  .type("array", CHATS_INVALID_TYPE)
  .version("1.0.0")
  .build();

const createdAtModel = createdAtCommonModel;
const privateIdModel = privateIdCommonModel;

const firstNameModel = modelBuilder
  .create()
  .empty(false, FIRST_NAME_EMPTY)
  .maxlength(18, FIRST_NAME_MAXLENGTH_REACH)
  .minlength(2, FIRST_NAME_MINLENGTH_REACH)
  .required(true, FIRST_NAME_REQUIRED)
  .trim(false)
  .type("string", FIRST_NAME_INVALID_TYPE)
  .version("1.0.0")
  .build();

const lastNameModel = modelBuilder
  .create()
  .defaultValue("")
  .empty(false, LAST_NAME_EMPTY)
  .maxlength(18, LAST_NAME_MAXLENGTH_REACH)
  .minlength(2, LAST_NAME_MINLENGTH_REACH)
  .required(false, {})
  .trim(false)
  .type("string", LAST_NAME_INVALID_TYPE)
  .version("1.0.0")
  .build();

const macAddressModel = modelBuilder
  .create()
  .empty(false, MAC_ADDRESS_EMPTY)
  .maxlength(16, MAC_ADDRESS_MAXLENGTH_REACH)
  .minlength(12, MAC_ADDRESS_MINLENGTH_REACH)
  .required(true, MAC_ADDRESS_REQUIRED)
  .trim(true)
  .type("string", MAC_ADDRESS_INVALID_TYPE)
  .unique(true, MAC_ADDRESS_EXIST)
  .version("1.0.0")
  .build();

const phoneNumberModel = modelBuilder
  .create()
  .empty(false, PHONE_NUMBER_EMPTY)
  .maxlength(14, PHONE_NUMBER_MAXLENGTH_REACH)
  .minlength(10, PHONE_NUMBER_MINLENGTH_REACH)
  .numeric(true, PHONE_NUMBER_NUMERIC)
  .required(true, PHONE_NUMBER_REQUIRED)
  .type("string", PHONE_NUMBER_INVALID_TYPE)
  .unique(true, PHONE_NUMBER_EXIST)
  .version("1.0.0")
  .build();

const tokenModel = modelBuilder
  .create()
  .required(true, TOKEN_REQUIRED)
  .type("string", TOKEN_INVALID_TYPE)
  .minlength(150, TOKEN_MINLENGTH_REACH)
  .maxlength(350, TOKEN_MAXLENGTH_REACH)
  .unique(true, TOKEN_EXIST)
  .version("1.0.0")
  .build();

const usernameModel = modelBuilder
  .create()
  .defaultValue("")
  .empty(false, USERNAME_EMPTY)
  .lowercase(true)
  .maxlength(12, USERNAME_MAXLENGTH_REACH)
  .minlength(4, USERNAME_MINLENGTH_REACH)
  .required(false)
  .trim(true)
  .type("string", USERNAME_INVALID_TYPE)
  .unique(false, USERNAME_EXIST)
  .version("1.0.0")
  .build();

const verificationCodeModel = modelBuilder
  .create()
  .empty(false, VERIFICATION_CODE_EMPTY)
  .length(6, VERIFICATION_CODE_INVALID_LENGTH)
  .maxlength(6, VERIFICATION_CODE_MAXLENGTH_REACH)
  .numeric(true, VERIFICATION_CODE_NUMERIC)
  .trim(true)
  .type("string", VERIFICATION_CODE_INVALID_TYPE)
  .version("1.0.0")
  .build();

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
