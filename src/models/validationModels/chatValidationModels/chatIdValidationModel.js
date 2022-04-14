const {
  chatModel: {
    properties: {
      chatIdModel: { properties: chatIdModel },
    },
  },
} = require("~/models/chatModels/chatModel");

const chatIdValidationModel = {
  properties: {
    chatId: {
      type: chatIdModel.type.value,
      unique: chatIdModel.unique.value,
      min: chatIdModel.minlength.value,
      max: chatIdModel.maxlength.value,
      trim: chatIdModel.trim.value,
      messages: {
        string: chatIdModel.type.error.message,
        required: chatIdModel.required.error.message,
        unique: chatIdModel.unique.error.message,
        stringMin: chatIdModel.minlength.error.message,
        stringMax: chatIdModel.maxlength.error.message,
      },
    },
  },

  info: {
    version: "1.0.0",
  },
};

module.exports = { chatIdValidationModel };
