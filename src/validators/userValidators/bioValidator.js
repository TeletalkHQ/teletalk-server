const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  bioValidationsModel: { properties: bioValidationsModel },
} = require("~/models/validationModels/userValidationModels/bioValidationsModel");

const bioValidation = {
  properties: bioValidationsModel,

  info: {
    version: "1.0.0",
  },
};

const bioValidator = validatorCompiler(bioValidation.properties);

module.exports = { bioValidator, bioValidation };
