const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  createdAtValidationModel: { properties: createdAtValidationModel },
} = require("~/models/validationModels/commonValidationModels/createdAtValidationModel");

const createdAtValidation = {
  properties: createdAtValidationModel,

  info: {
    version: "1.0.0",
  },
};

const createdAtValidator = validatorCompiler(createdAtValidation.properties);

module.exports = { createdAtValidator, createdAtValidation };
