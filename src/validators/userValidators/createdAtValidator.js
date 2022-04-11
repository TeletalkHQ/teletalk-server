const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  createdAtValidationModel,
} = require("~/models/validationModels/commonValidationModels/createdAtValidationModel");

const createdAtValidation = {
  properties: { ...createdAtValidationModel.properties },

  info: {
    version: "1.0.0",
  },
};

const createdAtValidator = validatorCompiler(createdAtValidation.properties);

module.exports = { createdAtValidator, createdAtValidation };
