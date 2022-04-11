const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  lastNameValidationModel,
} = require("~/models/validationModels/userValidationModels/lastNameValidationModel");

const lastNameValidation = {
  properties: { ...lastNameValidationModel.properties },

  info: {
    version: "1.0.0",
  },
};

const lastNameValidator = validatorCompiler(lastNameValidation.properties);

module.exports = { lastNameValidator, lastNameValidation };
