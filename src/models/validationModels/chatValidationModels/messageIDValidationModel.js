const {
  chatModel: {
    properties: {
      messageIdModel: { properties: messageIdModel },
    },
  },
} = require("~/models/chatModels/chatModel");

const messageIdValidationModel = {
  properties: {
    messageId: {
      type: messageIdModel.type.value,
      unique: messageIdModel.unique.value,
      min: messageIdModel.minlength.value,
      max: messageIdModel.maxlength.value,
      trim: messageIdModel.trim.value,
      messages: {
        string: messageIdModel.type.error.message,
        required: messageIdModel.required.error.message,
        unique: messageIdModel.unique.error.message,
        stringMin: messageIdModel.minlength.error.message,
        stringMax: messageIdModel.maxlength.error.message,
      },
    },
  },

  info: {
    version: "1.0.0",
  },
};

module.exports = { messageIdValidationModel };
