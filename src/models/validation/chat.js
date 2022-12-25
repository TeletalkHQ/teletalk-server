const { validationModelBuilder } = require("@/classes/ValidationModelBuilder");

const { nativeModels } = require("@/models/native");

const messageId = {
  messageId: validationModelBuilder
    .create()
    .setModelObject(nativeModels.chat.messageId)
    .type()
    .unique()
    .min()
    .max()
    .trim()
    .build(),
};

const chatId = {
  chatId: validationModelBuilder
    .create()
    .setModelObject(nativeModels.chat.chatId)
    .type()
    .unique()
    .empty()
    .min()
    .max()
    .trim()
    .build(),
};

const messageText = {
  message: validationModelBuilder
    .create()
    .setModelObject(nativeModels.chat.message)
    .type()
    .empty()
    .min()
    .max()
    .build(),
};

const participantId = {
  participantId: validationModelBuilder
    .create()
    .setModelObject(nativeModels.chat.participantId)
    .empty()
    .max()
    .min()
    .trim()
    .type()
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
