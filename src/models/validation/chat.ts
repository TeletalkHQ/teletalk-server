import { validationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { nativeModels } from "@/models/native";

const messageId = {
  messageId: validationModelBuilder
    .create()
    .setModel(nativeModels.privateChat.messageId)
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
    .setModel(nativeModels.privateChat.chatId)
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
  messageText: validationModelBuilder
    .create()
    .setModel(nativeModels.privateChat.messageText)
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
    .setModel(nativeModels.privateChat.participantId)
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

export { chatValidationModels };
