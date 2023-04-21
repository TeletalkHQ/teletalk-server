import { validationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { nativeModels } from "@/models/native";

const bio = {
  bio: validationModelBuilder
    .create()
    .setModel(nativeModels.bio)
    .type()
    .required()
    .max()
    .build(),
};

const countryCode = {
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

const countryName = {
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

const firstName = {
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

const lastName = {
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

const macAddress = {
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

const phoneNumber = {
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

const cellphone = {
  ...countryCode,
  ...countryName,
  ...phoneNumber,
};

const userId = {
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

const session = {
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

const verificationCode = {
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

const username = {
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

const userValidationModels = {
  bio,
  cellphone,
  countryCode,
  countryName,
  firstName,
  lastName,
  macAddress,
  phoneNumber,
  session,
  userId,
  username,
  verificationCode,
};

export { userValidationModels };
