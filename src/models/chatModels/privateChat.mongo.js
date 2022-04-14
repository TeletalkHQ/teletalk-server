const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const {
  mongooseSchemaPropertyGenerator,
} = require("~/functions/utilities/generators");

const {
  chatModel: {
    chatIdModel: { properties: chatID },
    createdAtModel: { properties: createdAt },
    messageIdModel: { properties: messageID },
    message: { properties: message },
    participantID: { properties: participantID },
  },
} = require("~/models/chatModels/chatModel");

// uniqueValidator.defaults.message = "{PATH}_exist";
// uniqueValidator.defaults.type = "mongoose-unique-validator";

const participantIDTemplate = mongooseSchemaPropertyGenerator(
  participantID.type.value,
  [participantID.maxlength.value, participantID.maxlength.error.message],
  [participantID.minlength.value, participantID.minlength.error.message],
  [participantID.required.value, participantID.required.error.message],
  null,
  participantID.trim.value
);

const privateChat = {
  chatID: mongooseSchemaPropertyGenerator(
    chatID.type.value,
    [chatID.maxlength.value, chatID.maxlength.error.message],
    [chatID.minlength.value, chatID.minlength.error.message],
    [chatID.required.value, chatID.required.error.message],
    chatID.unique.value
  ),
  createdAt: mongooseSchemaPropertyGenerator(
    createdAt.type.value,
    null,
    null,
    [createdAt.required.value, createdAt.required.error.message],
    null,
    null,
    createdAt.default.value
  ),
  messages: [
    {
      messageID: mongooseSchemaPropertyGenerator(
        messageID.type.value,
        [messageID.maxlength.value, messageID.maxlength.error.message],
        [messageID.minlength.value, messageID.minlength.error.message],
        [messageID.required.value, messageID.required.error.message],
        messageID.unique.value,
        messageID.trim.value,
        messageID.default.value(messageID.maxlength.value)
      ),
      message: mongooseSchemaPropertyGenerator(
        message.type.value,
        [message.maxlength.value, message.maxlength.error.message],
        [message.minlength.value, message.minlength.error.message]
      ),
      messageSender: {
        senderID: participantIDTemplate,
      },
    },
  ],
  participants: [
    {
      participantID: participantIDTemplate,
    },
  ],
};

const PrivateChatSchema = new mongoose.Schema({
  chatID: privateChat.chatID,
  createdAt: privateChat.createdAt,
  messages: privateChat.messages,
  participants: privateChat.participants,
});

PrivateChatSchema.plugin(uniqueValidator);

module.exports = { PrivateChatSchema };

const PrivateChatModel = mongoose.model(
  "PrivateChat",
  PrivateChatSchema,
  "privateChats"
);

module.exports = { PrivateChatModel };
