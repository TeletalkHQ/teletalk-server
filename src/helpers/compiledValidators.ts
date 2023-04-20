import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { models } from "@/models";

const validationModels = models.validation;

const bio = ValidationModelBuilder.compiler(validationModels.user.bio);

const chatId = ValidationModelBuilder.compiler(validationModels.chat.chatId);

const messageId = ValidationModelBuilder.compiler(
  validationModels.chat.messageId
);

const messageText = ValidationModelBuilder.compiler(
  validationModels.chat.messageText
);

const participantId = ValidationModelBuilder.compiler(
  validationModels.chat.participantId
);

const countryCode = ValidationModelBuilder.compiler(
  validationModels.user.countryCode
);

const countryName = ValidationModelBuilder.compiler(
  validationModels.user.countryName
);

const createdAt = ValidationModelBuilder.compiler(
  validationModels.common.createdAt
);

const firstName = ValidationModelBuilder.compiler(
  validationModels.user.firstName
);

const lastName = ValidationModelBuilder.compiler(
  validationModels.user.lastName
);

const macAddress = ValidationModelBuilder.compiler(
  validationModels.user.macAddress
);

const phoneNumber = ValidationModelBuilder.compiler(
  validationModels.user.phoneNumber
);

const userId = ValidationModelBuilder.compiler(validationModels.user.userId);

const session = ValidationModelBuilder.compiler(validationModels.user.session);

const username = ValidationModelBuilder.compiler(
  validationModels.user.username
);

const verificationCode = ValidationModelBuilder.compiler(
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
  session,
  userId,
  username,
  verificationCode,
};

export { compiledValidators };
