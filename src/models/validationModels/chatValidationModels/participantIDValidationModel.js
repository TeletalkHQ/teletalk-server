const {
  chatModel: {
    properties: {
      participantIdModel: { properties: participantIdModel },
    },
  },
} = require("~/models/chatModels/chatModel");

const participantIdValidationModel = {
  properties: {
    participantId: {
      type: participantIdModel.type.value,
      unique: participantIdModel.unique.value,
      min: participantIdModel.minlength.value,
      max: participantIdModel.maxlength.value,
      trim: participantIdModel.trim.value,
      messages: {
        string: participantIdModel.type.error.message,
        required: participantIdModel.required.error.message,
        unique: participantIdModel.unique.error.message,
        stringMin: participantIdModel.minlength.error.message,
        stringMax: participantIdModel.maxlength.error.message,
      },
    },
  },

  info: {
    version: "1.0.0",
  },
};

module.exports = { participantIdValidationModel };
