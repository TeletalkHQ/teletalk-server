const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  bioValidationsSchema,
} = require("~/schemas/validationSchemas/userValidationSchemas/bioValidationsSchema");

const bioValidation = {
  properties: { ...bioValidationsSchema.properties },

  info: {
    version: "1.0.0",
  },
};

const bioValidator = validatorCompiler(bioValidation.properties);

module.exports = { bioValidator, bioValidation };
