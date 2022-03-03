const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  createdAtValidationSchema,
} = require("~/schemas/validationSchemas/commonValidationSchemas/createdAtValidationSchema");

const createdAtValidation = {
  properties: { ...createdAtValidationSchema.properties },

  info: {
    version: "1.0.0",
  },
};

const createdAtValidator = validatorCompiler(createdAtValidation.properties);

module.exports = { createdAtValidator, createdAtValidation };
