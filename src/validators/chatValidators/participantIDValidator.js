const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  participantIDValidationSchema,
} = require("~/schemas/validationSchemas/chatValidationSchemas/participantIDValidationSchema");

const participantIDValidation = {
  properties: { ...participantIDValidationSchema.properties },

  info: {
    version: "1.0.0",
  },
};

const participantIDValidator = validatorCompiler(
  participantIDValidation.properties
);

module.exports = { participantIDValidator, participantIDValidation };
