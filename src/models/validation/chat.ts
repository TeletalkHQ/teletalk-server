import { validationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { nativeModels } from "@/models/native";

import { ValidationModel, ValidationPicker } from "@/types";

const messageId: ValidationModel<"messageId"> = {
  messageId: validationModelBuilder
    .create()
    .setModel(nativeModels.messageId)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .unique()
    .trim()
    .build(),
};

const chatId: ValidationModel<"chatId"> = {
  chatId: validationModelBuilder
    .create()
    .setModel(nativeModels.chatId)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .unique()
    .trim()
    .build(),
};

const senderId: ValidationModel<"senderId"> = {
  senderId: validationModelBuilder
    .create()
    .setModel(nativeModels.senderId)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .unique()
    .trim()
    .build(),
};

const messageText: ValidationModel<"messageText"> = {
  messageText: validationModelBuilder
    .create()
    .setModel(nativeModels.messageText)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .trim()
    .build(),
};

const participantId: ValidationModel<"participantId"> = {
  participantId: validationModelBuilder
    .create()
    .setModel(nativeModels.participantId)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .trim()
    .unique()
    .build(),
};

const messages: ValidationModel<"messages"> = {
  messages: validationModelBuilder
    .create()
    .setModel(nativeModels.messages)
    .type()
    .required()
    .build(),
};
const participants: ValidationModel<"participants"> = {
  participants: validationModelBuilder
    .create()
    .setModel(nativeModels.participants)
    .type()
    .required()
    .build(),
};
const privateChats: ValidationModel<"privateChats"> = {
  privateChats: validationModelBuilder
    .create()
    .setModel(nativeModels.privateChats)
    .type()
    .required()
    .build(),
};

type ChatValidationModels = ValidationPicker<
  | "chatId"
  | "messageId"
  | "messageText"
  | "participantId"
  | "messages"
  | "participants"
  | "privateChats"
  | "senderId"
>;

export const chatValidationModels: ChatValidationModels = {
  chatId,
  messageId,
  messages,
  messageText,
  participantId,
  participants,
  privateChats,
  senderId,
};
