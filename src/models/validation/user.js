const { validationModelBuilder } = require("@/classes/ValidationModelBuilder");

const { nativeModels } = require("@/models/native");

const bio = {
  bio: validationModelBuilder
    .create()
    .setModelObject(nativeModels.user.bio)
    .max()
    .optional()
    .type()
    .build(),
};

const countryCode = {
  countryCode: validationModelBuilder
    .create()
    .setModelObject(nativeModels.user.countryCode)
    .empty()
    .max()
    .min()
    .numeric()
    .trim()
    .type()
    .build(),
};

const countryName = {
  countryName: validationModelBuilder
    .create()
    .setModelObject(nativeModels.user.countryName)
    .empty()
    .max()
    .min()
    .type()
    .build(),
};

const firstName = {
  firstName: validationModelBuilder
    .create()
    .setModelObject(nativeModels.user.firstName)
    .empty()
    .max()
    .min()
    .trim()
    .type()
    .build(),
};

const lastName = {
  lastName: validationModelBuilder
    .create()
    .setModelObject(nativeModels.user.lastName)
    .max()
    .min()
    .optional()
    .trim()
    .type()
    .build(),
};

const macAddress = {
  macAddress: validationModelBuilder
    .create()
    .setModelObject(nativeModels.user.macAddress)
    .empty()
    .max()
    .min()
    .trim()
    .type()
    .unique()
    .build(),
};

const phoneNumber = {
  phoneNumber: validationModelBuilder
    .create()
    .setModelObject(nativeModels.user.phoneNumber)
    .empty()
    .max()
    .min()
    .numeric()
    .type()
    .build(),
};

const userId = {
  userId: validationModelBuilder
    .create()
    .setModelObject(nativeModels.user.userId)
    .max()
    .min()
    .trim()
    .type()
    .unique()
    .build(),
};

const token = {
  token: validationModelBuilder
    .create()
    .setModelObject(nativeModels.user.token)
    .type()
    .min()
    .max()
    .required()
    .build(),
};

const verificationCode = {
  verificationCode: validationModelBuilder
    .create()
    .setModelObject(nativeModels.user.verificationCode)
    .empty()
    .length()
    .max()
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
    .setModelObject(nativeModels.user.username)
    .empty()
    .lowercase()
    .max()
    .optional()
    .trim()
    .type()
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
  userId,
  token,
  username,
  verificationCode,
};

module.exports = {
  userValidationModels,
};
