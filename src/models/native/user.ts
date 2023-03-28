import { nativeModelBuilder } from "@/classes/modelBuilder/NativeModelBuilder";

import { commonModels } from "@/models/native/common";

import { errors } from "@/variables/errors";

const bio = nativeModelBuilder
  .create()
  .type("string", errors.BIO_INVALID_TYPE)
  .required(true, errors.BIO_REQUIRED)
  .empty(true)
  .trim(true)
  .minlength(0)
  .defaultValue("")
  .maxlength(255, errors.BIO_MAXLENGTH_REACH)
  .build();

const countryCode = nativeModelBuilder
  .create()
  .type("string", errors.COUNTRY_CODE_INVALID_TYPE)
  .required(true, errors.COUNTRY_CODE_REQUIRED)
  .empty(false, errors.COUNTRY_CODE_EMPTY)
  .minlength(1, errors.COUNTRY_CODE_MINLENGTH_REACH)
  .maxlength(4, errors.COUNTRY_CODE_MAXLENGTH_REACH)
  .numeric(true, errors.COUNTRY_CODE_NUMERIC)
  .trim(true)
  .build();

const countryName = nativeModelBuilder
  .create()
  .type("string", errors.COUNTRY_NAME_INVALID_TYPE)
  .required(true, errors.COUNTRY_NAME_REQUIRED)
  .empty(false, errors.COUNTRY_NAME_EMPTY)
  .minlength(2, errors.COUNTRY_NAME_MINLENGTH_REACH)
  .maxlength(50, errors.COUNTRY_NAME_MAXLENGTH_REACH)
  .trim(true)
  .build();

const createdAt = commonModels.createdAt;

const userId = commonModels.userId;

const firstName = nativeModelBuilder
  .create()
  .type("string", errors.FIRST_NAME_INVALID_TYPE)
  .required(true, errors.FIRST_NAME_REQUIRED)
  .empty(false, errors.FIRST_NAME_EMPTY)
  .minlength(2, errors.FIRST_NAME_MINLENGTH_REACH)
  .maxlength(18, errors.FIRST_NAME_MAXLENGTH_REACH)
  .trim(true)
  .build();

const lastName = nativeModelBuilder
  .create()
  .type("string", errors.LAST_NAME_INVALID_TYPE)
  .required(true, errors.LAST_NAME_REQUIRED)
  .empty(true)
  .minlength(2, errors.LAST_NAME_MINLENGTH_REACH)
  .maxlength(18, errors.LAST_NAME_MAXLENGTH_REACH)
  .trim(true)
  .build();

const macAddress = nativeModelBuilder
  .create()
  .type("string", errors.MAC_ADDRESS_INVALID_TYPE)
  .required(true, errors.MAC_ADDRESS_REQUIRED)
  .empty(false, errors.MAC_ADDRESS_EMPTY)
  .minlength(12, errors.MAC_ADDRESS_MINLENGTH_REACH)
  .maxlength(16, errors.MAC_ADDRESS_MAXLENGTH_REACH)
  .trim(true)
  .unique(true, errors.MAC_ADDRESS_EXIST)
  .build();

const isActive = nativeModelBuilder
  .create()
  .type("boolean", errors.ONLINE_INVALID_TYPE)
  .required(true, errors.ONLINE_REQUIRED)
  .defaultValue(false)
  .build();

const phoneNumber = nativeModelBuilder
  .create()
  .type("string", errors.PHONE_NUMBER_INVALID_TYPE)
  .required(true, errors.PHONE_NUMBER_REQUIRED)
  .empty(false, errors.PHONE_NUMBER_EMPTY)
  .minlength(10, errors.PHONE_NUMBER_MINLENGTH_REACH)
  .maxlength(14, errors.PHONE_NUMBER_MAXLENGTH_REACH)
  .numeric(true, errors.PHONE_NUMBER_NUMERIC)
  .unique(true, errors.PHONE_NUMBER_EXIST)
  .build();

const status = nativeModelBuilder
  .create()
  .type("object", errors.STATUS_INVALID_TYPE)
  .required(true, errors.STATUS_REQUIRED)
  .defaultValue({})
  .build();

const token = nativeModelBuilder
  .create()
  .type("string", errors.TOKEN_INVALID_TYPE)
  .required(true, errors.TOKEN_REQUIRED)
  .empty(false, errors.TOKEN_EMPTY)
  .minlength(100, errors.TOKEN_MINLENGTH_REACH)
  .maxlength(500, errors.TOKEN_MAXLENGTH_REACH)
  .unique(true, errors.TOKEN_EXIST)
  .build();

const username = nativeModelBuilder
  .create()
  .type("string", errors.USERNAME_INVALID_TYPE)
  .required(true, errors.USERNAME_REQUIRED)
  .empty(true)
  .minlength(0, errors.USERNAME_MINLENGTH_REACH)
  .maxlength(12, errors.USERNAME_MAXLENGTH_REACH)
  .unique(false, errors.USERNAME_EXIST)
  .trim(true)
  .build();

const verificationCode = nativeModelBuilder
  .create()
  .type("string", errors.VERIFICATION_CODE_INVALID_TYPE)
  .required(true, errors.VERIFICATION_CODE_REQUIRED)
  .empty(false, errors.VERIFICATION_CODE_EMPTY)
  .length(6, errors.VERIFICATION_CODE_INVALID_LENGTH)
  .numeric(true, errors.VERIFICATION_CODE_NUMERIC)
  .trim(true)
  .build();

const blacklist = nativeModelBuilder
  .create()
  .type("array", errors.BLACKLIST_INVALID_TYPE)
  .required(true, errors.BLACKLIST_REQUIRED)
  .empty(true)
  .build();

const contacts = nativeModelBuilder
  .create()
  .type("array", errors.CONTACTS_INVALID_TYPE)
  .required(true, errors.CONTACTS_REQUIRED)
  .empty(true)
  .build();

const sessions = nativeModelBuilder
  .create()
  .type("array", errors.SESSIONS_INVALID_TYPE)
  .required(true, errors.SESSIONS_REQUIRED)
  .empty(true)
  .build();

const userModels = {
  bio,
  blacklist,
  contacts,
  countryCode,
  countryName,
  createdAt,
  firstName,
  isActive,
  lastName,
  macAddress,
  phoneNumber,
  sessions,
  status,
  token,
  userId,
  username,
  verificationCode,
};

export { userModels };
