const { nativeModelBuilder } = require("@/classes/NativeModelBuilder");

const {
  versionCalculator,

  extractVersions,
} = require("@/functions/utilities/utilities");

const { common } = require("@/models/native/common");

const { errors } = require("@/variables/errors/errors");

const bio = nativeModelBuilder
  .create()
  .defaultValue("")
  .empty(false, errors.BIO_EMPTY)
  .maxlength(255, errors.BIO_MAXLENGTH_REACH)
  .minlength(2, errors.BIO_MINLENGTH_REACH)
  .required(false)
  .type("string", errors.BIO_INVALID_TYPE)
  .version("1.0.0")
  .build();

const blacklist = nativeModelBuilder
  .create()
  .defaultValue([])
  .type("array", errors.BLACKLIST_INVALID_TYPE)
  .version("1.0.0")
  .build();

const contacts = nativeModelBuilder
  .create()
  .defaultValue([])
  .maxlength(14)
  .minlength(10)
  .required(false)
  .type("array", errors.CONTACT_INVALID_TYPE)
  .version("1.0.0")
  .build();

const countryCode = nativeModelBuilder
  .create()
  .empty(false, errors.COUNTRY_CODE_EMPTY)
  .maxlength(4, errors.COUNTRY_CODE_MAXLENGTH_REACH)
  .minlength(1, errors.COUNTRY_CODE_MINLENGTH_REACH)
  .numeric(true, errors.COUNTRY_CODE_NUMERIC)
  .required(true, errors.COUNTRY_CODE_REQUIRED)
  .trim(true)
  .type("string", errors.COUNTRY_CODE_INVALID_TYPE)
  .version("1.0.0")
  .build();

const countryName = nativeModelBuilder
  .create()
  .empty(false, errors.COUNTRY_NAME_EMPTY)
  .maxlength(50, errors.COUNTRY_NAME_MAXLENGTH_REACH)
  .minlength(2, errors.COUNTRY_NAME_MINLENGTH_REACH)
  .required(true, errors.COUNTRY_NAME_REQUIRED)
  .type("string", errors.COUNTRY_NAME_INVALID_TYPE)
  .version("1.0.0")
  .build();

const chatInfo = nativeModelBuilder
  .create()
  .type("array", errors.CHATS_INVALID_TYPE)
  .version("1.0.0")
  .build();

const createdAt = common.createdAt;
const privateId = common.privateId;

const firstName = nativeModelBuilder
  .create()
  .empty(false, errors.FIRST_NAME_EMPTY)
  .maxlength(18, errors.FIRST_NAME_MAXLENGTH_REACH)
  .minlength(2, errors.FIRST_NAME_MINLENGTH_REACH)
  .required(true, errors.FIRST_NAME_REQUIRED)
  .trim(false)
  .type("string", errors.FIRST_NAME_INVALID_TYPE)
  .version("1.0.0")
  .build();

const lastName = nativeModelBuilder
  .create()
  .defaultValue("")
  .empty(false, errors.LAST_NAME_EMPTY)
  .maxlength(18, errors.LAST_NAME_MAXLENGTH_REACH)
  .minlength(2, errors.LAST_NAME_MINLENGTH_REACH)
  .required(false, {})
  .trim(false)
  .type("string", errors.LAST_NAME_INVALID_TYPE)
  .version("1.0.0")
  .build();

const macAddress = nativeModelBuilder
  .create()
  .empty(false, errors.MAC_ADDRESS_EMPTY)
  .maxlength(16, errors.MAC_ADDRESS_MAXLENGTH_REACH)
  .minlength(12, errors.MAC_ADDRESS_MINLENGTH_REACH)
  .required(true, errors.MAC_ADDRESS_REQUIRED)
  .trim(true)
  .type("string", errors.MAC_ADDRESS_INVALID_TYPE)
  .unique(true, errors.MAC_ADDRESS_EXIST)
  .version("1.0.0")
  .build();

const phoneNumber = nativeModelBuilder
  .create()
  .empty(false, errors.PHONE_NUMBER_EMPTY)
  .maxlength(14, errors.PHONE_NUMBER_MAXLENGTH_REACH)
  .minlength(10, errors.PHONE_NUMBER_MINLENGTH_REACH)
  .numeric(true, errors.PHONE_NUMBER_NUMERIC)
  .required(true, errors.PHONE_NUMBER_REQUIRED)
  .type("string", errors.PHONE_NUMBER_INVALID_TYPE)
  .unique(true, errors.PHONE_NUMBER_EXIST)
  .version("1.0.0")
  .build();

const token = nativeModelBuilder
  .create()
  .required(true, errors.TOKEN_REQUIRED)
  .type("string", errors.TOKEN_INVALID_TYPE)
  .minlength(100, errors.TOKEN_MINLENGTH_REACH)
  .maxlength(450, errors.TOKEN_MAXLENGTH_REACH)
  .unique(true, errors.TOKEN_EXIST)
  .version("1.0.0")
  .build();

const username = nativeModelBuilder
  .create()
  .defaultValue("")
  .empty(false, errors.USERNAME_EMPTY)
  .lowercase(true)
  .maxlength(12, errors.USERNAME_MAXLENGTH_REACH)
  .minlength(4, errors.USERNAME_MINLENGTH_REACH)
  .required(false)
  .trim(true)
  .type("string", errors.USERNAME_INVALID_TYPE)
  .unique(false, errors.USERNAME_EXIST)
  .version("1.0.0")
  .build();

const verificationCode = nativeModelBuilder
  .create()
  .empty(false, errors.VERIFICATION_CODE_EMPTY)
  .length(6, errors.VERIFICATION_CODE_INVALID_LENGTH)
  .maxlength(6, errors.VERIFICATION_CODE_MAXLENGTH_REACH)
  .numeric(true, errors.VERIFICATION_CODE_NUMERIC)
  .trim(true)
  .type("string", errors.VERIFICATION_CODE_INVALID_TYPE)
  .version("1.0.0")
  .build();

const models = {
  bio,
  blacklist,
  chatInfo,
  contacts,
  countryCode,
  countryName,
  createdAt,
  firstName,
  lastName,
  macAddress,
  phoneNumber,
  privateId,
  token,
  username,
  verificationCode,
};

const user = {
  version: versionCalculator(extractVersions(models)),
  ...models,
};

module.exports = {
  user,
};