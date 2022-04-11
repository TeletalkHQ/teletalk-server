const {
  phoneNumberValidationModel,
} = require("~/models/validationModels/userValidationModels/phoneNumberValidationModel");

const {
  countryCodeValidationModel,
} = require("~/models/validationModels/userValidationModels/countryCodeValidationModel");
const {
  countryNameValidationModel,
} = require("~/models/validationModels/userValidationModels/countryNameValidationModel");
const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const cellphoneValidation = {
  properties: {
    ...phoneNumberValidationModel.properties,
    ...countryCodeValidationModel.properties,
    ...countryNameValidationModel.properties,
  },

  info: {
    version: "1.0.0",
  },
};

const cellphoneValidator = validatorCompiler(cellphoneValidation.properties);

module.exports = { cellphoneValidator, cellphoneValidation };
