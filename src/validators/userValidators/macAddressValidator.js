const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  macAddressValidationSchema,
} = require("~/schemas/validationSchemas/userValidationSchemas/macAddressValidationSchema");

const macAddressValidation = {
  properties: { ...macAddressValidationSchema.properties },

  info: {
    version: "1.0.0",
  },
};

const macAddressValidator = validatorCompiler(macAddressValidation.properties);

module.exports = { macAddressValidator, macAddressValidation };
