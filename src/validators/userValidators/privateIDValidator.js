const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  privateIDValidationModel,
} = require("~/models/validationModels/userValidationModels/privateIDValidationModel");

const privateIDValidation = {
  properties: { ...privateIDValidationModel.properties },

  info: {
    version: "1.0.0",
  },
};

const privateIDValidator = validatorCompiler(privateIDValidation.properties);

module.exports = { privateIDValidator, privateIDValidation };
