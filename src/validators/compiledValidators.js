const { ValidationModelBuilder } = require("@/classes/ValidationModelBuilder");

const { models } = require("@/models");

const validationModels = models.validation;

const bio = ValidationModelBuilder.validatorCompiler(validationModels.user.bio);

const chatId = ValidationModelBuilder.validatorCompiler(
  validationModels.chat.chatId
);

const messageId = ValidationModelBuilder.validatorCompiler(
  validationModels.chat.messageId
);

const messageText = ValidationModelBuilder.validatorCompiler(
  validationModels.chat.messageText
);

const participantId = ValidationModelBuilder.validatorCompiler(
  validationModels.chat.participantId
);

const countryCode = ValidationModelBuilder.validatorCompiler(
  validationModels.user.countryCode
);

const countryName = ValidationModelBuilder.validatorCompiler(
  validationModels.user.countryName
);

const createdAt = ValidationModelBuilder.validatorCompiler(
  validationModels.common.createdAt
);

const firstName = ValidationModelBuilder.validatorCompiler(
  validationModels.user.firstName
);

const lastName = ValidationModelBuilder.validatorCompiler(
  validationModels.user.lastName
);

const macAddress = ValidationModelBuilder.validatorCompiler(
  validationModels.user.macAddress
);

const phoneNumber = ValidationModelBuilder.validatorCompiler(
  validationModels.user.phoneNumber
);

const userId = ValidationModelBuilder.validatorCompiler(
  validationModels.user.userId
);

const token = ValidationModelBuilder.validatorCompiler(
  validationModels.user.token
);

const username = ValidationModelBuilder.validatorCompiler(
  validationModels.user.username
);

const verificationCode = ValidationModelBuilder.validatorCompiler(
  validationModels.user.verificationCode
);

const compiledValidators = {
  bio,
  chatId,
  countryCode,
  countryName,
  createdAt,
  firstName,
  lastName,
  macAddress,
  messageId,
  messageText,
  participantId,
  phoneNumber,
  userId,
  token,
  username,
  verificationCode,
};

module.exports = { compiledValidators };
