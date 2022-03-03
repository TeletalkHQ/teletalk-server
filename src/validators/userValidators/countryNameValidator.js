const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  countryNameValidationSchema,
} = require("~/schemas/validationSchemas/userValidationSchemas/countryNameValidationSchema");

const countryNameValidation = {
  properties: { ...countryNameValidationSchema.properties },

  info: {
    version: "1.0.0",
  },
};

const countryNameValidator = validatorCompiler(
  countryNameValidation.properties
);

module.exports = { countryNameValidator, countryNameValidation };
