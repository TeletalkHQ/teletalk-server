const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  macAddressValidationModel,
} = require("~/models/validationModels/userValidationModels/macAddressValidationModel");

const macAddressValidation = {
  properties: { ...macAddressValidationModel.properties },

  info: {
    version: "1.0.0",
  },
};

const macAddressValidator = validatorCompiler(macAddressValidation.properties);

module.exports = { macAddressValidator, macAddressValidation };
