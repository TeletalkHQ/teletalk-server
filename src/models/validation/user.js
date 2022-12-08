const { validationModelBuilder } = require("@/classes/ValidationModelBuilder");

const { extractVersions, versionCalculator } = require("@/utilities/utilities");

const { nativeModels } = require("@/models/native");

const bio = {
  bio: validationModelBuilder
    .create()
    .setModelObject(nativeModels.user.bio)
    .empty()
    .max()
    .optional()
    .type()
    .build(),
  version: "1.0.0",
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
  version: "1.0.0",
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
  version: "1.0.0",
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
  version: "1.0.0",
};

const lastName = {
  lastName: validationModelBuilder
    .create()
    .setModelObject(nativeModels.user.lastName)
    .empty()
    .max()
    .min()
    .optional()
    .trim()
    .type()
    .build(),
  version: "1.0.0",
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
  version: "1.0.0",
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
  version: "1.0.0",
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
  version: "1.0.0",
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
  version: "1.0.0",
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
  version: "1.0.0",
};
const cellphone = {
  ...countryCode,
  ...countryName,
  ...phoneNumber,

  version: "1.0.0",
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

  version: "1.0.0",
};

const validationModels = {
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

const user = {
  ...validationModels,
  version: versionCalculator(extractVersions(validationModels)),
};

module.exports = {
  user,
};
