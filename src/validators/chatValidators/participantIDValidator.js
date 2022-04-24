const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  participantIdValidationModel: { properties: participantIdValidationModel },
} = require("~/models/validationModels/chatValidationModels/participantIdValidationModel");

const participantIDValidation = {
  properties: participantIdValidationModel,

  info: {
    version: "1.0.0",
  },
};

const participantIDValidator = validatorCompiler(
  participantIDValidation.properties
);

module.exports = { participantIDValidator, participantIDValidation };
