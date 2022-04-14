const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  firstNameValidationModel,
} = require("~/models/validationModels/userValidationModels/firstNameValidationModel");

const firstNameValidation = {
  properties: { ...firstNameValidationModel.properties },

  info: {
    version: "1.0.0",
  },
};

const firstNameValidator = validatorCompiler(firstNameValidation.properties);

module.exports = { firstNameValidator, firstNameValidation };
