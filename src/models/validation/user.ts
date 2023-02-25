import { validationModelBuilder } from "@/classes/ValidationModelBuilder";

import { nativeModels } from "@/models/native";

const bio = {
  bio: validationModelBuilder
    .create()
    .setModel(nativeModels.user.bio)
    .type()
    .required()
    .max()
    .build(),
};

const countryCode = {
  countryCode: validationModelBuilder
    .create()
    .setModel(nativeModels.user.countryCode)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .numeric()
    .trim()
    .build(),
};

const countryName = {
  countryName: validationModelBuilder
    .create()
    .setModel(nativeModels.user.countryName)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .trim()
    .build(),
};

const firstName = {
  firstName: validationModelBuilder
    .create()
    .setModel(nativeModels.user.firstName)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .trim()
    .build(),
};

const lastName = {
  lastName: validationModelBuilder
    .create()
    .setModel(nativeModels.user.lastName)
    .type()
    .required()
    .min()
    .max()
    .trim()
    .build(),
};

const macAddress = {
  macAddress: validationModelBuilder
    .create()
    .setModel(nativeModels.user.macAddress)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .trim()
    .unique()
    .build(),
};

const phoneNumber = {
  phoneNumber: validationModelBuilder
    .create()
    .setModel(nativeModels.user.phoneNumber)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .numeric()
    .build(),
};

const userId = {
  userId: validationModelBuilder
    .create()
    .setModel(nativeModels.user.userId)
    .required()
    .type()
    .empty()
    .min()
    .max()
    .trim()
    .unique()
    .build(),
};

const token = {
  token: validationModelBuilder
    .create()
    .setModel(nativeModels.user.token)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .build(),
};

const verificationCode = {
  verificationCode: validationModelBuilder
    .create()
    .setModel(nativeModels.user.verificationCode)
    .required()
    .empty()
    .length()
    // .max()
    .numeric()
    .trim()
    .type()
    .build(),
};
const cellphone = {
  ...countryCode,
  ...countryName,
  ...phoneNumber,
};

const username = {
  username: validationModelBuilder
    .create()
    .setModel(nativeModels.user.username)
    .type()
    .required()
    .min()
    .max()
    .trim()
    .unique()
    .build(),
};

const userValidationModels = {
  bio,
  cellphone,
  countryCode,
  countryName,
  firstName,
  lastName,
  macAddress,
  phoneNumber,
  token,
  userId,
  username,
  verificationCode,
};

export { userValidationModels };
