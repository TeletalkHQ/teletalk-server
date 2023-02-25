const mongoose = require("mongoose");

const { mongoModelBuilder } = require("@/classes/MongoModelBuilder");

const { mongooseUniqueValidator } = require("@/plugins/mongoose");

const { nativeModels } = require("@/models/native");

const chatModels = nativeModels.chat;

const { createdAt, participantId } = {
  createdAt: mongoModelBuilder
    .create()
    .setModel(chatModels.createdAt)
    .type()
    .required()
    .build(),
  participantId: mongoModelBuilder
    .create()
    .setModel(chatModels.participantId)
    .type()
    .required()
    .minlength()
    .maxlength()
    .trim()
    .build(),
};

const PrivateChatSchema = new mongoose.Schema({
  chatId: mongoModelBuilder
    .create()
    .setModel(chatModels.chatId)
    .type()
    .required()
    .minlength()
    .maxlength()
    .unique()
    .build(),
  createdAt,
  messages: mongoModelBuilder
    .create()
    .setModel(chatModels.messages)
    .type()
    .required()
    .items({
      createdAt,
      message: mongoModelBuilder
        .create()
        .setModel(chatModels.message)
        .type()
        .required()
        .minlength()
        .maxlength()
        .build(),
      messageId: mongoModelBuilder
        .create()
        .setModel(chatModels.messageId)
        .type()
        .required()
        .minlength()
        .maxlength()
        .trim()
        .build(),
      sender: {
        senderId: participantId,
      },
    })
    .build(),
  participants: mongoModelBuilder
    .create()
    .setModel(chatModels.participants)
    .type()
    .required()
    .items({ participantId })
    .build(),
});

PrivateChatSchema.plugin(mongooseUniqueValidator);

const PrivateChat = mongoose.model(
  "PrivateChat",
  PrivateChatSchema,
  "privateChats"
);

module.exports = {
  PrivateChat,
  PrivateChatSchema,
};
