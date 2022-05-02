const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const {
  mongooseSchemaPropertyGenerator,
} = require("~/functions/utilities/generators");

const {
  chatModels: {
    properties: {
      chatIdModel: { properties: chatIdModel },
      createdAtModel: { properties: createdAtModel },
      messageIdModel: { properties: messageIdModel },
      messageModel: { properties: messageModel },
      participantIdModel: { properties: participantIdModel },
    },
  },
} = require("~/models/chatModels/chatModels");

// uniqueValidator.defaults.message = "{PATH}_exist";
// uniqueValidator.defaults.type = "mongoose-unique-validator";

const participantIDTemplate = mongooseSchemaPropertyGenerator(
  participantIdModel.type.value,
  [
    participantIdModel.maxlength.value,
    participantIdModel.maxlength.error.message,
  ],
  [
    participantIdModel.minlength.value,
    participantIdModel.minlength.error.message,
  ],
  [
    participantIdModel.required.value,
    participantIdModel.required.error.message,
  ],
  null,
  participantIdModel.trim.value
);

const privateChat = {
  chatId: mongooseSchemaPropertyGenerator(
    chatIdModel.type.value,
    [chatIdModel.maxlength.value, chatIdModel.maxlength.error.message],
    [chatIdModel.minlength.value, chatIdModel.minlength.error.message],
    [chatIdModel.required.value, chatIdModel.required.error.message],
    chatIdModel.unique.value
  ),
  createdAt: mongooseSchemaPropertyGenerator(
    createdAtModel.type.value,
    null,
    null,
    [createdAtModel.required.value, createdAtModel.required.error.message],
    null,
    null,
    createdAtModel.default.value
  ),
  messages: [
    {
      messageId: mongooseSchemaPropertyGenerator(
        messageIdModel.type.value,
        [
          messageIdModel.maxlength.value,
          messageIdModel.maxlength.error.message,
        ],
        [
          messageIdModel.minlength.value,
          messageIdModel.minlength.error.message,
        ],
        [messageIdModel.required.value, messageIdModel.required.error.message],
        messageIdModel.unique.value,
        messageIdModel.trim.value,
        messageIdModel.default.value(messageIdModel.maxlength.value)
      ),
      message: mongooseSchemaPropertyGenerator(
        messageModel.type.value,
        [messageModel.maxlength.value, messageModel.maxlength.error.message],
        [messageModel.minlength.value, messageModel.minlength.error.message]
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
  chatId: privateChat.chatId,
  createdAt: privateChat.createdAt,
  messages: privateChat.messages,
  participants: privateChat.participants,
});

PrivateChatSchema.plugin(uniqueValidator);

module.exports = { PrivateChatSchema };

const PrivateChatMongoModel = mongoose.model(
  "PrivateChat",
  PrivateChatSchema,
  "privateChats"
);

module.exports = { PrivateChatMongoModel };
