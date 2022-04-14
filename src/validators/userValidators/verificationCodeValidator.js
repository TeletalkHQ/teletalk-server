const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  verificationCodeValidationModel,
} = require("~/models/validationModels/userValidationModels/verificationCodeValidationModel");

const verificationCodeValidation = {
  properties: { ...verificationCodeValidationModel.properties },

  info: {
    version: "1.0.0",
  },
};

const verificationCodeValidator = validatorCompiler(
  verificationCodeValidation.properties
);

module.exports = { verificationCodeValidator, verificationCodeValidation };
