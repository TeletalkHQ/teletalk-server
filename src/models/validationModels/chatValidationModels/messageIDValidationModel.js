const {
  chatModel: {
    messageIdModel: { properties: messageID },
  },
} = require("~/models/chatModels/chatModel");

const messageIDValidationModel = {
  properties: {
    messageID: {
      type: messageID.type.value,
      unique: messageID.unique.value,
      min: messageID.minlength.value,
      max: messageID.maxlength.value,
      trim: messageID.trim.value,
      messages: {
        string: messageID.type.error.message,
        required: messageID.required.error.message,
        unique: messageID.unique.error.message,
        stringMin: messageID.minlength.error.message,
        stringMax: messageID.maxlength.error.message,
      },
    },
  },

  info: {
    version: "1.0.0",
  },
};

module.exports = { messageIDValidationModel };
