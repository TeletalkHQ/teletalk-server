const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  usernameValidationModel: { properties: usernameValidationModel },
} = require("~/models/validationModels/userValidationModels/usernameValidationModel");

const usernameValidation = {
  properties: usernameValidationModel,

  info: {
    version: "1.0.0",
  },
};

const usernameValidator = validatorCompiler(usernameValidation.properties);

module.exports = { usernameValidator, usernameValidation };
