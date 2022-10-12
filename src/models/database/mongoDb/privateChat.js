const mongoose = require("mongoose");

const { mongoModelBuilder } = require("@/classes/MongoModelBuilder");

const { mongooseUniqueValidator } = require("@/plugins/mongoosePlugins");

const { nativeModels } = require("@/models/native/native");
const { excludeVersions } = require("@/functions/utilities/utilities");

const chatModelsWithoutVersion = excludeVersions(nativeModels.chat);

const { chatId, createdAt, message, messageId, participantId } = {
  chatId: mongoModelBuilder
    .create()
    .setModelObject(chatModelsWithoutVersion.chatId)
    .type()
    .maxlength()
    .minlength()
    .required()
    .unique()
    .build(),
  createdAt: mongoModelBuilder
    .create()
    .setModelObject(chatModelsWithoutVersion.createdAt)
    .type()
    .required()
    .defaultValue()
    .build(),
  message: mongoModelBuilder
    .create()
    .setModelObject(chatModelsWithoutVersion.message)
    .type()
    .maxlength()
    .minlength()
    .build(),
  messageId: mongoModelBuilder
    .create()
    .setModelObject(chatModelsWithoutVersion.messageId)
    .type()
    .minlength()
    .maxlength()
    .required()
    .unique()
    .trim()
    .defaultValue()
    .build(),
  participantId: mongoModelBuilder
    .create()
    .setModelObject(chatModelsWithoutVersion.participantId)
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
      messageSender: {
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
