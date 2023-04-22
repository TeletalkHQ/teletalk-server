import { nativeModelBuilder } from "@/classes/modelBuilder/NativeModelBuilder";

import { commonModels } from "@/models/native/common";

import { ERRORS } from "@/variables";

const bio = nativeModelBuilder
  .create()
  .type("string", ERRORS.BIO_INVALID_TYPE)
  .required(true, ERRORS.BIO_REQUIRED)
  .empty(true)
  .trim(true)
  .minlength(0)
  .defaultValue("")
  .maxlength(255, ERRORS.BIO_MAXLENGTH_REACH)
  .build();

const countryCode = nativeModelBuilder
  .create()
  .type("string", ERRORS.COUNTRY_CODE_INVALID_TYPE)
  .required(true, ERRORS.COUNTRY_CODE_REQUIRED)
  .empty(false, ERRORS.COUNTRY_CODE_EMPTY)
  .minlength(1, ERRORS.COUNTRY_CODE_MINLENGTH_REACH)
  .maxlength(4, ERRORS.COUNTRY_CODE_MAXLENGTH_REACH)
  .numeric(true, ERRORS.COUNTRY_CODE_NUMERIC)
  .trim(true)
  .build();

const countryName = nativeModelBuilder
  .create()
  .type("string", ERRORS.COUNTRY_NAME_INVALID_TYPE)
  .required(true, ERRORS.COUNTRY_NAME_REQUIRED)
  .empty(false, ERRORS.COUNTRY_NAME_EMPTY)
  .minlength(2, ERRORS.COUNTRY_NAME_MINLENGTH_REACH)
  .maxlength(50, ERRORS.COUNTRY_NAME_MAXLENGTH_REACH)
  .trim(true)
  .build();

const createdAt = commonModels.createdAt;

const userId = commonModels.userId;

const firstName = nativeModelBuilder
  .create()
  .type("string", ERRORS.FIRST_NAME_INVALID_TYPE)
  .required(true, ERRORS.FIRST_NAME_REQUIRED)
  .empty(false, ERRORS.FIRST_NAME_EMPTY)
  .minlength(2, ERRORS.FIRST_NAME_MINLENGTH_REACH)
  .maxlength(18, ERRORS.FIRST_NAME_MAXLENGTH_REACH)
  .trim(true)
  .build();

const lastName = nativeModelBuilder
  .create()
  .type("string", ERRORS.LAST_NAME_INVALID_TYPE)
  .required(true, ERRORS.LAST_NAME_REQUIRED)
  .empty(true)
  .minlength(2, ERRORS.LAST_NAME_MINLENGTH_REACH)
  .maxlength(18, ERRORS.LAST_NAME_MAXLENGTH_REACH)
  .trim(true)
  .build();

const macAddress = nativeModelBuilder
  .create()
  .type("string", ERRORS.MAC_ADDRESS_INVALID_TYPE)
  .required(true, ERRORS.MAC_ADDRESS_REQUIRED)
  .empty(false, ERRORS.MAC_ADDRESS_EMPTY)
  .minlength(12, ERRORS.MAC_ADDRESS_MINLENGTH_REACH)
  .maxlength(16, ERRORS.MAC_ADDRESS_MAXLENGTH_REACH)
  .trim(true)
  .unique(true, ERRORS.MAC_ADDRESS_EXIST)
  .build();

const isActive = nativeModelBuilder
  .create()
  .type("boolean", ERRORS.ONLINE_INVALID_TYPE)
  .required(true, ERRORS.ONLINE_REQUIRED)
  .defaultValue(false)
  .build();

const phoneNumber = nativeModelBuilder
  .create()
  .type("string", ERRORS.PHONE_NUMBER_INVALID_TYPE)
  .required(true, ERRORS.PHONE_NUMBER_REQUIRED)
  .empty(false, ERRORS.PHONE_NUMBER_EMPTY)
  .minlength(10, ERRORS.PHONE_NUMBER_MINLENGTH_REACH)
  .maxlength(14, ERRORS.PHONE_NUMBER_MAXLENGTH_REACH)
  .numeric(true, ERRORS.PHONE_NUMBER_NUMERIC)
  .unique(true, ERRORS.PHONE_NUMBER_EXIST)
  .build();

const status = nativeModelBuilder
  .create()
  .type("object", ERRORS.STATUS_INVALID_TYPE)
  .required(true, ERRORS.STATUS_REQUIRED)
  .defaultValue({})
  .build();

const session = nativeModelBuilder
  .create()
  .type("string", ERRORS.SESSION_INVALID_TYPE)
  .required(true, ERRORS.SESSION_REQUIRED)
  .empty(false, ERRORS.SESSION_EMPTY)
  .minlength(100, ERRORS.SESSION_MINLENGTH_REACH)
  .maxlength(500, ERRORS.SESSION_MAXLENGTH_REACH)
  .unique(true, ERRORS.SESSION_EXIST)
  .build();

const username = nativeModelBuilder
  .create()
  .type("string", ERRORS.USERNAME_INVALID_TYPE)
  .required(true, ERRORS.USERNAME_REQUIRED)
  .empty(true)
  .minlength(0, ERRORS.USERNAME_MINLENGTH_REACH)
  .maxlength(12, ERRORS.USERNAME_MAXLENGTH_REACH)
  .unique(false, ERRORS.USERNAME_EXIST)
  .trim(true)
  .build();

const verificationCode = nativeModelBuilder
  .create()
  .type("string", ERRORS.VERIFICATION_CODE_INVALID_TYPE)
  .required(true, ERRORS.VERIFICATION_CODE_REQUIRED)
  .empty(false, ERRORS.VERIFICATION_CODE_EMPTY)
  .length(6, ERRORS.VERIFICATION_CODE_INVALID_LENGTH)
  .numeric(true, ERRORS.VERIFICATION_CODE_NUMERIC)
  .trim(true)
  .build();

const blacklist = nativeModelBuilder
  .create()
  .type("array", ERRORS.BLACKLIST_INVALID_TYPE)
  .required(true, ERRORS.BLACKLIST_REQUIRED)
  .empty(true)
  .build();

const contacts = nativeModelBuilder
  .create()
  .type("array", ERRORS.CONTACTS_INVALID_TYPE)
  .required(true, ERRORS.CONTACTS_REQUIRED)
  .empty(true)
  .build();

const sessions = nativeModelBuilder
  .create()
  .type("array", ERRORS.SESSIONS_INVALID_TYPE)
  .required(true, ERRORS.SESSIONS_REQUIRED)
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
  session,
  userId,
  username,
  verificationCode,
};

export { userModels };
