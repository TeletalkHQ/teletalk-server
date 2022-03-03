const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  firstNameValidationSchema,
} = require("~/schemas/validationSchemas/userValidationSchemas/firstNameValidationSchema");

const firstNameValidation = {
  properties: { ...firstNameValidationSchema.properties },

  info: {
    version: "1.0.0",
  },
};

const firstNameValidator = validatorCompiler(firstNameValidation.properties);

module.exports = { firstNameValidator, firstNameValidation };
