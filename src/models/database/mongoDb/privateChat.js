const mongoose = require("mongoose");

const { mongoModelBuilder } = require("@/classes/MongoModelBuilder");

const { mongooseUniqueValidator } = require("@/plugins/mongoose");

const { nativeModels } = require("@/models/native");

const chatModels = nativeModels.chat;

const { chatId, createdAt, message, messageId, participantId } = {
  chatId: mongoModelBuilder
    .create()
    .setModelObject(chatModels.chatId)
    .type()
    .maxlength()
    .minlength()
    .required()
    .unique()
    .build(),
  createdAt: mongoModelBuilder
    .create()
    .setModelObject(chatModels.createdAt)
    .type()
    .required()
    .defaultValue()
    .build(),
  message: mongoModelBuilder
    .create()
    .setModelObject(chatModels.message)
    .type()
    .maxlength()
    .minlength()
    .build(),
  messageId: mongoModelBuilder
    .create()
    .setModelObject(chatModels.messageId)
    .type()
    .minlength()
    .maxlength()
    .required()
    //FIXME: Should be unique
    // .unique()
    .trim()
    .defaultValue()
    .build(),
  participantId: mongoModelBuilder
    .create()
    .setModelObject(chatModels.participantId)
    .type()
    .maxlength()
    .minlength()
    .required()
    .trim()
    .build(),
};

const PrivateChatSchema = new mongoose.Schema({
  chatId,
  createdAt,
  messages: [
    {
      message,
      messageId,
      sender: {
        senderId: participantId,
      },
    },
  ],
  participants: [
    {
      participantId,
    },
  ],
});

PrivateChatSchema.plugin(mongooseUniqueValidator);

module.exports = { PrivateChatSchema };

const PrivateChat = mongoose.model(
  "PrivateChat",
  PrivateChatSchema,
  "privateChats"
);

module.exports = { PrivateChat };
