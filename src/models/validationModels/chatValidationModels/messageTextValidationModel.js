const {
  chatModel: {
    properties: {
      messageModel: { properties: messageModel },
    },
  },
} = require("~/models/chatModels/chatModel");

const messageTextValidationModel = {
  properties: {
    message: {
      type: messageModel.type.value,
      min: messageModel.minlength.value,
      max: messageModel.maxlength.value,
      messages: {
        string: messageModel.type.error.message,
        stringMin: messageModel.minlength.error.message,
        stringMax: messageModel.maxlength.error.message,
      },
    },
  },

  info: {
    version: "1.0.0",
  },
};

module.exports = { messageTextValidationModel };
