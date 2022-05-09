const {
  versionCalculator,
  extractVersions,
} = require("@/functions/utilities/utils");

const {
  chatModels: { chatIdModel, messageIdModel, messageModel, participantIdModel },
} = require("@/models/chatModels/chatModels");

const messageIdValidationModel = {
  messageId: {
    type: messageIdModel.type.value,
    unique: messageIdModel.unique.value,
    min: messageIdModel.minlength.value,
    max: messageIdModel.maxlength.value,
    trim: messageIdModel.trim.value,
    messages: {
      string: messageIdModel.type.error.message,
      required: messageIdModel.required.error.message,
      unique: messageIdModel.unique.error.message,
      stringMin: messageIdModel.minlength.error.message,
      stringMax: messageIdModel.maxlength.error.message,
    },
  },
  version: "1.0.0",
};

const chatIdValidationModel = {
  chatId: {
    type: chatIdModel.type.value,
    unique: chatIdModel.unique.value,
    min: chatIdModel.minlength.value,
    max: chatIdModel.maxlength.value,
    trim: chatIdModel.trim.value,
    messages: {
      string: chatIdModel.type.error.message,
      required: chatIdModel.required.error.message,
      unique: chatIdModel.unique.error.message,
      stringMin: chatIdModel.minlength.error.message,
      stringMax: chatIdModel.maxlength.error.message,
    },
  },
  version: "1.0.0",
};

const messageTextValidationModel = {
  message: {
    type: messageModel.type.value,
    min: messageModel.minlength.value,
    max: messageModel.maxlength.value,
    messages: {
      string: messageModel.type.error.message,
      stringMin: messageModel.minlength.error.message,
      stringMax: messageModel.maxlength.error.message,
    },
  },
  version: "1.0.0",
};

const participantIdValidationModel = {
  participantId: {
    type: participantIdModel.type.value,
    unique: participantIdModel.unique.value,
    min: participantIdModel.minlength.value,
    max: participantIdModel.maxlength.value,
    trim: participantIdModel.trim.value,
    messages: {
      string: participantIdModel.type.error.message,
      required: participantIdModel.required.error.message,
      unique: participantIdModel.unique.error.message,
      stringMin: participantIdModel.minlength.error.message,
      stringMax: participantIdModel.maxlength.error.message,
    },
  },
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
