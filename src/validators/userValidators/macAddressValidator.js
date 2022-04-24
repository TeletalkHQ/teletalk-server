const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  macAddressValidationModel: { properties: macAddressValidationModel },
} = require("~/models/validationModels/userValidationModels/macAddressValidationModel");

const macAddressValidation = {
  properties: macAddressValidationModel,

  info: {
    version: "1.0.0",
  },
};

const macAddressValidator = validatorCompiler(macAddressValidation.properties);

module.exports = { macAddressValidator, macAddressValidation };
