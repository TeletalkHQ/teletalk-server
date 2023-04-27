import { validationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { nativeModels } from "@/models/native";

import { ValidationPicker } from "@/types";

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
  chatId: validationModelBuilder
    .create("chatId")
    .setModel(nativeModels.chatId)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .unique()
    .trim()
    .build(),
  messageId: validationModelBuilder
    .create("messageId")
    .setModel(nativeModels.messageId)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .unique()
    .trim()
    .build(),
  messages: validationModelBuilder
    .create("messages")
    .setModel(nativeModels.messages)
    .type()
    .required()
    .build(),
  messageText: validationModelBuilder
    .create("messageText")
    .setModel(nativeModels.messageText)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .trim()
    .build(),
  participantId: validationModelBuilder
    .create("participantId")
    .setModel(nativeModels.participantId)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .trim()
    .unique()
    .build(),
  participants: validationModelBuilder
    .create("participants")
    .setModel(nativeModels.participants)
    .type()
    .required()
    .build(),
  privateChats: validationModelBuilder
    .create("privateChats")
    .setModel(nativeModels.privateChats)
    .type()
    .required()
    .build(),
  senderId: validationModelBuilder
    .create("senderId")
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
