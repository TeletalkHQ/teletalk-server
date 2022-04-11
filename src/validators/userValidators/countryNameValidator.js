const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  countryNameValidationModel,
} = require("~/models/validationModels/userValidationModels/countryNameValidationModel");

const countryNameValidation = {
  properties: { ...countryNameValidationModel.properties },

  info: {
    version: "1.0.0",
  },
};

const countryNameValidator = validatorCompiler(
  countryNameValidation.properties
);

module.exports = { countryNameValidator, countryNameValidation };
