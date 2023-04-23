import { nativeModelBuilder } from "@/classes/modelBuilder/NativeModelBuilder";

import { commonModels } from "@/models/native/common";
import { NativeModelPicker } from "@/types";

import { ERRORS } from "@/variables";

type UserModels = NativeModelPicker<
  | "bio"
  | "blacklist"
  | "contacts"
  | "countryCode"
  | "countryName"
  | "createdAt"
  | "firstName"
  | "isActive"
  | "lastName"
  | "macAddress"
  | "phoneNumber"
  | "session"
  | "sessions"
  | "status"
  | "userId"
  | "username"
  | "verificationCode"
>;

export const userModels: UserModels = {
  bio: nativeModelBuilder
    .create()
    .type("string", ERRORS.BIO_INVALID_TYPE)
    .required(true, ERRORS.BIO_REQUIRED)
    .empty(true)
    .trim(true)
    .minLength(0)
    .defaultValue("")
    .maxLength(255, ERRORS.BIO_MAX_LENGTH_REACH)
    .build(),
  blacklist: nativeModelBuilder
    .create()
    .type("array", ERRORS.BLACKLIST_INVALID_TYPE)
    .required(true, ERRORS.BLACKLIST_REQUIRED)
    .empty(true)
    .build(),
  contacts: nativeModelBuilder
    .create()
    .type("array", ERRORS.CONTACTS_INVALID_TYPE)
    .required(true, ERRORS.CONTACTS_REQUIRED)
    .empty(true)
    .build(),
  countryCode: nativeModelBuilder
    .create()
    .type("string", ERRORS.COUNTRY_CODE_INVALID_TYPE)
    .required(true, ERRORS.COUNTRY_CODE_REQUIRED)
    .empty(false, ERRORS.COUNTRY_CODE_EMPTY)
    .minLength(1, ERRORS.COUNTRY_CODE_MIN_LENGTH_REACH)
    .maxLength(4, ERRORS.COUNTRY_CODE_MAX_LENGTH_REACH)
    .numeric(true, ERRORS.COUNTRY_CODE_NUMERIC)
    .trim(true)
    .build(),
  countryName: nativeModelBuilder
    .create()
    .type("string", ERRORS.COUNTRY_NAME_INVALID_TYPE)
    .required(true, ERRORS.COUNTRY_NAME_REQUIRED)
    .empty(false, ERRORS.COUNTRY_NAME_EMPTY)
    .minLength(2, ERRORS.COUNTRY_NAME_MIN_LENGTH_REACH)
    .maxLength(50, ERRORS.COUNTRY_NAME_MAX_LENGTH_REACH)
    .trim(true)
    .build(),
  createdAt: commonModels.createdAt,
  firstName: nativeModelBuilder
    .create()
    .type("string", ERRORS.FIRST_NAME_INVALID_TYPE)
    .required(true, ERRORS.FIRST_NAME_REQUIRED)
    .empty(false, ERRORS.FIRST_NAME_EMPTY)
    .minLength(2, ERRORS.FIRST_NAME_MIN_LENGTH_REACH)
    .maxLength(18, ERRORS.FIRST_NAME_MAX_LENGTH_REACH)
    .trim(true)
    .build(),
  isActive: nativeModelBuilder
    .create()
    .type("boolean", ERRORS.ONLINE_INVALID_TYPE)
    .required(true, ERRORS.ONLINE_REQUIRED)
    .defaultValue(false)
    .build(),
  lastName: nativeModelBuilder
    .create()
    .type("string", ERRORS.LAST_NAME_INVALID_TYPE)
    .required(true, ERRORS.LAST_NAME_REQUIRED)
    .empty(true)
    .minLength(2, ERRORS.LAST_NAME_MIN_LENGTH_REACH)
    .maxLength(18, ERRORS.LAST_NAME_MAX_LENGTH_REACH)
    .trim(true)
    .build(),
  macAddress: nativeModelBuilder
    .create()
    .type("string", ERRORS.MAC_ADDRESS_INVALID_TYPE)
    .required(true, ERRORS.MAC_ADDRESS_REQUIRED)
    .empty(false, ERRORS.MAC_ADDRESS_EMPTY)
    .minLength(12, ERRORS.MAC_ADDRESS_MIN_LENGTH_REACH)
    .maxLength(16, ERRORS.MAC_ADDRESS_MAX_LENGTH_REACH)
    .trim(true)
    .unique(true, ERRORS.MAC_ADDRESS_EXIST)
    .build(),
  phoneNumber: nativeModelBuilder
    .create()
    .type("string", ERRORS.PHONE_NUMBER_INVALID_TYPE)
    .required(true, ERRORS.PHONE_NUMBER_REQUIRED)
    .empty(false, ERRORS.PHONE_NUMBER_EMPTY)
    .minLength(10, ERRORS.PHONE_NUMBER_MIN_LENGTH_REACH)
    .maxLength(14, ERRORS.PHONE_NUMBER_MAX_LENGTH_REACH)
    .numeric(true, ERRORS.PHONE_NUMBER_NUMERIC)
    .unique(true, ERRORS.PHONE_NUMBER_EXIST)
    .build(),
  session: nativeModelBuilder
    .create()
    .type("string", ERRORS.SESSION_INVALID_TYPE)
    .required(true, ERRORS.SESSION_REQUIRED)
    .empty(false, ERRORS.SESSION_EMPTY)
    .minLength(100, ERRORS.SESSION_MIN_LENGTH_REACH)
    .maxLength(500, ERRORS.SESSION_MAX_LENGTH_REACH)
    .unique(true, ERRORS.SESSION_EXIST)
    .build(),
  sessions: nativeModelBuilder
    .create()
    .type("array", ERRORS.SESSIONS_INVALID_TYPE)
    .required(true, ERRORS.SESSIONS_REQUIRED)
    .empty(true)
    .build(),
  status: nativeModelBuilder
    .create()
    .type("object", ERRORS.STATUS_INVALID_TYPE)
    .required(true, ERRORS.STATUS_REQUIRED)
    .defaultValue({})
    .build(),
  userId: commonModels.userId,
  username: nativeModelBuilder
    .create()
    .type("string", ERRORS.USERNAME_INVALID_TYPE)
    .required(true, ERRORS.USERNAME_REQUIRED)
    .empty(true)
    .minLength(0, ERRORS.USERNAME_MIN_LENGTH_REACH)
    .maxLength(12, ERRORS.USERNAME_MAX_LENGTH_REACH)
    .unique(false, ERRORS.USERNAME_EXIST)
    .trim(true)
    .build(),
  verificationCode: nativeModelBuilder
    .create()
    .type("string", ERRORS.VERIFICATION_CODE_INVALID_TYPE)
    .required(true, ERRORS.VERIFICATION_CODE_REQUIRED)
    .empty(false, ERRORS.VERIFICATION_CODE_EMPTY)
    .length(6, ERRORS.VERIFICATION_CODE_INVALID_LENGTH)
    .numeric(true, ERRORS.VERIFICATION_CODE_NUMERIC)
    .trim(true)
    .build(),
};
