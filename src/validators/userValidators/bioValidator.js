const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  bioValidationsModel,
} = require("~/models/validationModels/userValidationModels/bioValidationsModel");

const bioValidation = {
  properties: { ...bioValidationsModel.properties },

  info: {
    version: "1.0.0",
  },
};

const bioValidator = validatorCompiler(bioValidation.properties);

module.exports = { bioValidator, bioValidation };
