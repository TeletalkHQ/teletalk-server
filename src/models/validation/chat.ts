const { validationModelBuilder } = require("@/classes/ValidationModelBuilder");

const { nativeModels } = require("@/models/native");

const messageId = {
  messageId: validationModelBuilder
    .create()
    .setModel(nativeModels.chat.messageId)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .unique()
    .trim()
    .build(),
};

const chatId = {
  chatId: validationModelBuilder
    .create()
    .setModel(nativeModels.chat.chatId)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .unique()
    .trim()
    .build(),
};

const messageText = {
  message: validationModelBuilder
    .create()
    .setModel(nativeModels.chat.message)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .trim()
    .build(),
};

const participantId = {
  participantId: validationModelBuilder
    .create()
    .setModel(nativeModels.chat.participantId)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .trim()
    .unique()
    .build(),
};

const chatValidationModels = {
  chatId,
  messageId,
  messageText,
  participantId,
};

module.exports = { chatValidationModels };
