const { validationModelBuilder } = require("@/classes/ValidationModelBuilder");

const { extractVersions, versionCalculator } = require("@/utilities/utilities");

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
  version: "1.0.0",
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
  version: "1.0.0",
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
  version: "1.0.0",
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
  version: "1.0.0",
};

const validationModels = {
  chatId,
  messageId,
  messageText,
  participantId,
};

const chat = {
  ...validationModels,
  version: versionCalculator(extractVersions(validationModels)),
};

module.exports = { chat };
