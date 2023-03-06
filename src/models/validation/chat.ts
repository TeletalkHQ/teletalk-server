import { validationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { nativeModels } from "@/models/native";

const messageId = validationModelBuilder
  .create()
  .setModel(nativeModels.chat.messageId)
  .type()
  .required()
  .empty()
  .min()
  .max()
  .unique()
  .trim()
  .build();

const chatId = validationModelBuilder
  .create()
  .setModel(nativeModels.chat.chatId)
  .type()
  .required()
  .empty()
  .min()
  .max()
  .unique()
  .trim()
  .build();

const messageText = validationModelBuilder
  .create()
  .setModel(nativeModels.chat.message)
  .type()
  .required()
  .empty()
  .min()
  .max()
  .trim()
  .build();

const participantId = validationModelBuilder
  .create()
  .setModel(nativeModels.chat.participantId)
  .type()
  .required()
  .empty()
  .min()
  .max()
  .trim()
  .unique()
  .build();

const chatValidationModels = {
  chatId,
  messageId,
  messageText,
  participantId,
};

export { chatValidationModels };
