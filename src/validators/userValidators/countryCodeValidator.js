const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  countryCodeValidationModel,
} = require("~/models/validationModels/userValidationModels/countryCodeValidationModel");

const countryCodeValidation = {
  properties: { ...countryCodeValidationModel.properties },

  info: {
    version: "1.0.0",
  },
};

const countryCodeValidator = validatorCompiler(
  countryCodeValidation.properties
);

module.exports = { countryCodeValidator, countryCodeValidation };
