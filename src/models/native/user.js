const { nativeModelBuilder } = require("@/classes/NativeModelBuilder");

const { commonModels } = require("@/models/native/common");

const { errors } = require("@/variables/errors");
const { FIELD_TYPE } = require("@/variables/others/fieldType");

const bio = nativeModelBuilder
  .create()
  .defaultValue("")
  .minlength(0)
  .empty(true)
  .maxlength(255, errors.BIO_MAXLENGTH_REACH)
  .required(false)
  .type(FIELD_TYPE.STRING, errors.BIO_INVALID_TYPE)
  .build();

const blacklist = nativeModelBuilder
  .create()
  .required(false)
  .defaultValue([])
  .type(FIELD_TYPE.ARRAY, errors.BLACKLIST_INVALID_TYPE)
  .build();

const contacts = nativeModelBuilder
  .create()
  .defaultValue([])
  .maxlength(14)
  .minlength(10)
  .required(false)
  .type(FIELD_TYPE.ARRAY, errors.CONTACT_INVALID_TYPE)
  .build();

const countryCode = nativeModelBuilder
  .create()
  .empty(false, errors.COUNTRY_CODE_EMPTY)
  .maxlength(4, errors.COUNTRY_CODE_MAXLENGTH_REACH)
  .minlength(1, errors.COUNTRY_CODE_MINLENGTH_REACH)
  .numeric(true, errors.COUNTRY_CODE_NUMERIC)
  .required(true, errors.COUNTRY_CODE_REQUIRED)
  .trim(true)
  .type(FIELD_TYPE.STRING, errors.COUNTRY_CODE_INVALID_TYPE)
  .build();

const countryName = nativeModelBuilder
  .create()
  .empty(false, errors.COUNTRY_NAME_EMPTY)
  .maxlength(50, errors.COUNTRY_NAME_MAXLENGTH_REACH)
  .minlength(2, errors.COUNTRY_NAME_MINLENGTH_REACH)
  .required(true, errors.COUNTRY_NAME_REQUIRED)
  .type(FIELD_TYPE.STRING, errors.COUNTRY_NAME_INVALID_TYPE)
  .build();

const createdAt = commonModels.createdAt;

const userId = commonModels.userId;

const firstName = nativeModelBuilder
  .create()
  .empty(false, errors.FIRST_NAME_EMPTY)
  .maxlength(18, errors.FIRST_NAME_MAXLENGTH_REACH)
  .minlength(2, errors.FIRST_NAME_MINLENGTH_REACH)
  .required(true, errors.FIRST_NAME_REQUIRED)
  .trim(false)
  .type(FIELD_TYPE.STRING, errors.FIRST_NAME_INVALID_TYPE)
  .build();

const lastName = nativeModelBuilder
  .create()
  .defaultValue("")
  .empty(true)
  .maxlength(18, errors.LAST_NAME_MAXLENGTH_REACH)
  .minlength(2, errors.LAST_NAME_MINLENGTH_REACH)
  .required(false, {})
  .trim(false)
  .type(FIELD_TYPE.STRING, errors.LAST_NAME_INVALID_TYPE)
  .build();

const macAddress = nativeModelBuilder
  .create()
  .empty(false, errors.MAC_ADDRESS_EMPTY)
  .maxlength(16, errors.MAC_ADDRESS_MAXLENGTH_REACH)
  .minlength(12, errors.MAC_ADDRESS_MINLENGTH_REACH)
  .required(true, errors.MAC_ADDRESS_REQUIRED)
  .trim(true)
  .type(FIELD_TYPE.STRING, errors.MAC_ADDRESS_INVALID_TYPE)
  .unique(true, errors.MAC_ADDRESS_EXIST)
  .build();

const phoneNumber = nativeModelBuilder
  .create()
  .empty(false, errors.PHONE_NUMBER_EMPTY)
  .maxlength(14, errors.PHONE_NUMBER_MAXLENGTH_REACH)
  .minlength(10, errors.PHONE_NUMBER_MINLENGTH_REACH)
  .numeric(true, errors.PHONE_NUMBER_NUMERIC)
  .required(true, errors.PHONE_NUMBER_REQUIRED)
  .type(FIELD_TYPE.STRING, errors.PHONE_NUMBER_INVALID_TYPE)
  .unique(true, errors.PHONE_NUMBER_EXIST)
  .build();

const token = nativeModelBuilder
  .create()
  .required(true, errors.TOKEN_REQUIRED)
  .empty(false, errors.TOKEN_EMPTY)
  .type(FIELD_TYPE.STRING, errors.TOKEN_INVALID_TYPE)
  .minlength(100, errors.TOKEN_MINLENGTH_REACH)
  .maxlength(500, errors.TOKEN_MAXLENGTH_REACH)
  .unique(true, errors.TOKEN_EXIST)
  .build();

const username = nativeModelBuilder
  .create()
  .defaultValue("")
  .empty(true)
  .lowercase(true)
  .maxlength(12, errors.USERNAME_MAXLENGTH_REACH)
  .minlength(4, errors.USERNAME_MINLENGTH_REACH)
  .required(false)
  .trim(true)
  .type(FIELD_TYPE.STRING, errors.USERNAME_INVALID_TYPE)
  .unique(false, errors.USERNAME_EXIST)
  .build();

const verificationCode = nativeModelBuilder
  .create()
  .empty(false, errors.VERIFICATION_CODE_EMPTY)
  .length(6, errors.VERIFICATION_CODE_INVALID_LENGTH)
  .maxlength(6, errors.VERIFICATION_CODE_MAXLENGTH_REACH)
  .numeric(true, errors.VERIFICATION_CODE_NUMERIC)
  .trim(true)
  .type(FIELD_TYPE.STRING, errors.VERIFICATION_CODE_INVALID_TYPE)
  .build();

const userModels = {
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
  token,
  userId,
  username,
  verificationCode,
};

module.exports = {
  userModels,
};
