const {
  validatorCompiler,
} = require("~/functions/utilities/validatorCompiler");

const {
  participantIDValidationModel,
} = require("~/models/validationModels/chatValidationModels/participantIDValidationModel");

const participantIDValidation = {
  properties: { ...participantIDValidationModel.properties },

  info: {
    version: "1.0.0",
  },
};

const participantIDValidator = validatorCompiler(
  participantIDValidation.properties
);

module.exports = { participantIDValidator, participantIDValidation };
