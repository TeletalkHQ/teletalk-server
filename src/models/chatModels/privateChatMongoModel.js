const mongoose = require("mongoose");

const { mongoModelBuilder } = require("@/classes/MongoModelBuilder");

const { uniqueValidator } = require("@/configs/mongoosePlugins");

const {
  chatModels: {
    chatIdModel,
    createdAtModel,
    messageIdModel,
    messageModel,
    participantIdModel,
  },
} = require("@/models/chatModels/chatModels");

const { chatId, createdAt, message, messageId, participantId } = {
  chatId: mongoModelBuilder
    .create()
    .setModelObject(chatIdModel)
    .type()
    .maxlength()
    .minlength()
    .required()
    .unique()
    .build(),
  createdAt: mongoModelBuilder
    .create()
    .setModelObject(createdAtModel)
    .type()
    .required()
    .defaultValue()
    .build(),
  message: mongoModelBuilder
    .create()
    .setModelObject(messageModel)
    .type()
    .maxlength()
    .minlength()
    .build(),
  messageId: mongoModelBuilder
    .create()
    .setModelObject(messageIdModel)
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
    .setModelObject(participantIdModel)
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
  participants: [
    {
      participantId: participantId,
    },
  ],
  messages: [
    {
      message,
      messageId,
      messageSender: {
        senderId: participantId,
      },
    },
  ],
});

PrivateChatSchema.plugin(uniqueValidator);

module.exports = { PrivateChatSchema };

const PrivateChatMongoModel = mongoose.model(
  "PrivateChat",
  PrivateChatSchema,
  "privateChats"
);

module.exports = { PrivateChatMongoModel };
