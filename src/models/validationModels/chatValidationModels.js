const { validationModelBuilder } = require("@/functions/helpers/Builders");
const {
  versionCalculator,
  extractVersions,
} = require("@/functions/utilities/utils");

const {
  chatModels: { chatIdModel, messageIdModel, messageModel, participantIdModel },
} = require("@/models/chatModels/chatModels");

const messageIdValidationModel = {
  messageId: validationModelBuilder
    .create()
    .setModelObject(messageIdModel)
    .type()
    .unique()
    .min()
    .max()
    .trim()
    .build(),
  version: "1.0.0",
};

const chatIdValidationModel = {
  chatId: validationModelBuilder
    .create()
    .setModelObject(chatIdModel)
    .type()
    .unique()
    .min()
    .max()
    .trim()
    .build(),
  version: "1.0.0",
};

const messageTextValidationModel = {
  message: validationModelBuilder
    .create()
    .setModelObject(messageModel)
    .type()
    .empty()
    .min()
    .max()
    .build(),
  version: "1.0.0",
};

const participantIdValidationModel = {
  participantId: validationModelBuilder
    .create()
    .setModelObject(participantIdModel)
    .empty()
    .max()
    .min()
    .trim()
    .type()
    .unique()
    .build(),
  version: "1.0.0",
};

const models = {
  messageIdValidationModel,
  participantIdValidationModel,
  messageTextValidationModel,
  chatIdValidationModel,
};

const chatValidationModels = {
  ...models,
  version: versionCalculator(extractVersions(models)),
};

module.exports = { chatValidationModels };
