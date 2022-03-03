const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  lastNameValidationSchema,
} = require("~/schemas/validationSchemas/userValidationSchemas/lastNameValidationSchema");

const lastNameValidation = {
  properties: { ...lastNameValidationSchema.properties },

  info: {
    version: "1.0.0",
  },
};

const lastNameValidator = validatorCompiler(lastNameValidation.properties);

module.exports = { lastNameValidator, lastNameValidation };
