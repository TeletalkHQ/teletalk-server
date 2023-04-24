import { validationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { nativeModels } from "@/models/native";

import { ValidationModel, ValidationPicker } from "@/types";

const bio: ValidationModel<"bio"> = {
  bio: validationModelBuilder
    .create()
    .setModel(nativeModels.bio)
    .type()
    .required()
    .max()
    .build(),
};

const countryCode: ValidationModel<"countryCode"> = {
  countryCode: validationModelBuilder
    .create()
    .setModel(nativeModels.countryCode)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .numeric()
    .trim()
    .build(),
};

const countryName: ValidationModel<"countryName"> = {
  countryName: validationModelBuilder
    .create()
    .setModel(nativeModels.countryName)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .trim()
    .build(),
};

const firstName: ValidationModel<"firstName"> = {
  firstName: validationModelBuilder
    .create()
    .setModel(nativeModels.firstName)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .trim()
    .build(),
};

const isActive: ValidationModel<"isActive"> = {
  isActive: validationModelBuilder
    .create()
    .setModel(nativeModels.isActive)
    .type()
    .required()
    .build(),
};

const lastName: ValidationModel<"lastName"> = {
  lastName: validationModelBuilder
    .create()
    .setModel(nativeModels.lastName)
    .type()
    .required()
    .min()
    .max()
    .trim()
    .build(),
};

const macAddress: ValidationModel<"macAddress"> = {
  macAddress: validationModelBuilder
    .create()
    .setModel(nativeModels.macAddress)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .trim()
    .unique()
    .build(),
};

const phoneNumber: ValidationModel<"phoneNumber"> = {
  phoneNumber: validationModelBuilder
    .create()
    .setModel(nativeModels.phoneNumber)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .numeric()
    .build(),
};

const userId: ValidationModel<"userId"> = {
  userId: validationModelBuilder
    .create()
    .setModel(nativeModels.userId)
    .required()
    .type()
    .empty()
    .min()
    .max()
    .trim()
    .unique()
    .build(),
};

const session: ValidationModel<"session"> = {
  session: validationModelBuilder
    .create()
    .setModel(nativeModels.session)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .build(),
};

const verificationCode: ValidationModel<"verificationCode"> = {
  verificationCode: validationModelBuilder
    .create()
    .setModel(nativeModels.verificationCode)
    .required()
    .empty()
    .length()
    // .max()
    .numeric()
    .trim()
    .type()
    .build(),
};

const username: ValidationModel<"username"> = {
  username: validationModelBuilder
    .create()
    .setModel(nativeModels.username)
    .type()
    .required()
    .min()
    .max()
    .trim()
    .unique()
    .build(),
};

const sessions: ValidationModel<"sessions"> = {
  sessions: validationModelBuilder
    .create()
    .setModel(nativeModels.sessions)
    .type()
    .required()
    .build(),
};
const blacklist: ValidationModel<"blacklist"> = {
  blacklist: validationModelBuilder
    .create()
    .setModel(nativeModels.blacklist)
    .type()
    .required()
    .build(),
};
const contacts: ValidationModel<"contacts"> = {
  contacts: validationModelBuilder
    .create()
    .setModel(nativeModels.contacts)
    .type()
    .required()
    .build(),
};
const status: ValidationModel<"status"> = {
  status: validationModelBuilder
    .create()
    .setModel(nativeModels.status)
    .type()
    .required()
    .build(),
};

type UserValidationModels = ValidationPicker<
  | "bio"
  | "blacklist"
  | "contacts"
  | "countryCode"
  | "countryName"
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

export const userValidationModels: UserValidationModels = {
  bio,
  blacklist,
  contacts,
  countryCode,
  countryName,
  firstName,
  isActive,
  lastName,
  macAddress,
  phoneNumber,
  session,
  sessions,
  status,
  userId,
  username,
  verificationCode,
};
