const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  privateIdValidationModel: { properties: privateIdValidationModel },
} = require("~/models/validationModels/userValidationModels/privateIdValidationModel");

const privateIdValidation = {
  properties: privateIdValidationModel,

  info: {
    version: "1.0.0",
  },
};

const privateIdValidator = validatorCompiler(privateIdValidation.properties);

module.exports = { privateIdValidator, privateIdValidation };
