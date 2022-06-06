const { validationModelBuilder } = require("@/functions/helpers/Builders");
const {
  versionCalculator,
  extractVersions,
} = require("@/functions/utilities/utils");

const {
  userModels: {
    bioModel,
    countryCodeModel,
    countryNameModel,
    firstNameModel,
    lastNameModel,
    macAddressModel,
    phoneNumberModel,
    privateIdModel,
    tokenModel,
    usernameModel,
    verificationCodeModel,
  },
} = require("@/models/userModels/userModels");

const bioValidationModel = {
  bio: {
    empty: bioModel.empty.value,
    max: bioModel.maxlength.value,
    optional: !bioModel.required.value,
    type: bioModel.type.value,
    messages: {
      string: bioModel.type.error.message,
      stringEmpty: bioModel.empty.error.message,
      stringMax: bioModel.maxlength.error.message,
    },
  },
  version: "1.0.0",
};

const countryCodeValidationModel = {
  countryCode: validationModelBuilder
    .create()
    .setModelObject(countryCodeModel)
    .empty()
    .max()
    .min()
    .numeric()
    .trim()
    .type()
    .build(),
  version: "1.0.0",
};

const countryNameValidationModel = {
  countryName: validationModelBuilder
    .create()
    .setModelObject(countryNameModel)
    .empty()
    .max()
    .min()
    .type()
    .build(),
  version: "1.0.0",
};

const firstNameValidationModel = {
  firstName: validationModelBuilder
    .create()
    .setModelObject(firstNameModel)
    .empty()
    .max()
    .min()
    .trim()
    .type()
    .build(),
  version: "1.0.0",
};

const lastNameValidationModel = {
  lastName: validationModelBuilder
    .create()
    .setModelObject(lastNameModel)
    .empty()
    .max()
    .min()
    .optional()
    .trim()
    .type()
    .build(),
  version: "1.0.0",
};

const macAddressValidationModel = {
  macAddress: validationModelBuilder
    .create()
    .setModelObject(macAddressModel)
    .empty()
    .max()
    .min()
    .trim()
    .type()
    .unique()
    .build(),
  version: "1.0.0",
};

const phoneNumberValidationModel = {
  phoneNumber: validationModelBuilder
    .create()
    .setModelObject(phoneNumberModel)
    .empty()
    .max()
    .min()
    .numeric()
    .type()
    .build(),
  version: "1.0.0",
};

const privateIdValidationModel = {
  privateId: validationModelBuilder
    .create()
    .setModelObject(privateIdModel)
    .max()
    .min()
    .trim()
    .type()
    .unique()
    .build(),
  version: "1.0.0",
};

const tokenValidationModel = {
  token: validationModelBuilder
    .create()
    .setModelObject(tokenModel)
    .type()
    .required()
    .build(),
  version: "1.0.0",
};

const verificationCodeValidationModel = {
  verificationCode: validationModelBuilder
    .create()
    .setModelObject(verificationCodeModel)
    .empty()
    .length()
    .numeric()
    .trim()
    .type()
    .build(),
  version: "1.0.0",
};
const cellphoneValidationModel = {
  ...countryCodeValidationModel,
  ...countryNameValidationModel,
  ...phoneNumberValidationModel,

  version: "1.0.0",
};

const usernameValidationModel = {
  username: validationModelBuilder
    .create()
    .setModelObject(usernameModel)
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

const models = {
  bioValidationModel,
  cellphoneValidationModel,
  countryCodeValidationModel,
  countryNameValidationModel,
  firstNameValidationModel,
  lastNameValidationModel,
  macAddressValidationModel,
  phoneNumberValidationModel,
  privateIdValidationModel,
  tokenValidationModel,
  usernameValidationModel,
  verificationCodeValidationModel,
};

const userValidationModels = {
  ...models,
  version: versionCalculator(extractVersions(models)),
};

module.exports = {
  userValidationModels,
};
