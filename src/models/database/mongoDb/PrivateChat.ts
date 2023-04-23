import { model, Schema, SchemaDefinitionProperty } from "mongoose";

import { makeMongoSchemaValue } from "@/helpers/makeMongoSchemaValue";

import { nativeModels } from "@/models/native";

import { IPrivateChatDoc, IPrivateChatModel } from "@/types";

const chatIdMaker = makeMongoSchemaValue(nativeModels.chatId);
const messageIdMaker = makeMongoSchemaValue(nativeModels.messageId);
const messageTextMaker = makeMongoSchemaValue(nativeModels.messageText);
const participantIdMaker = makeMongoSchemaValue(nativeModels.participantId);

const chatId: SchemaDefinitionProperty = {
  maxLength: chatIdMaker("maxLength"),
  minLength: chatIdMaker("minLength"),
  required: chatIdMaker("required"),
  type: "string",
  unique: nativeModels.chatId.required.value,
};

const createdAt: SchemaDefinitionProperty = {
  required: nativeModels.createdAt.required.value,
  type: "number",
};

const messageText: SchemaDefinitionProperty = {
  maxLength: messageTextMaker("maxLength"),
  minLength: messageTextMaker("minLength"),
  required: nativeModels.messageText.required.value,
  type: "string",
};

const messageId: SchemaDefinitionProperty = {
  maxLength: messageIdMaker("maxLength"),
  minLength: messageIdMaker("minLength"),
  required: nativeModels.messageId.required.value,
  trim: nativeModels.messageId.trim.value,
  type: "string",
};

const participantId: SchemaDefinitionProperty = {
  maxLength: participantIdMaker("maxLength"),
  minLength: participantIdMaker("minLength"),
  required: nativeModels.participantId.required.value,
  trim: nativeModels.participantId.trim.value,
  type: "string",
};

const senderId: SchemaDefinitionProperty = {
  maxLength: participantIdMaker("maxLength"),
  minLength: participantIdMaker("minLength"),
  required: nativeModels.participantId.required.value,
  trim: nativeModels.participantId.trim.value,
  type: "string",
};

const PrivateChatSchema = new Schema<IPrivateChatDoc, IPrivateChatModel>({
  chatId,
  createdAt,
  messages: [
    {
      createdAt,
      messageText,
      messageId,
      sender: {
        senderId,
      },
    },
  ],
  participants: [
    {
      participantId,
    },
  ],
});

const PrivateChatModel = model<IPrivateChatDoc, IPrivateChatModel>(
  "PrivateChat",
  PrivateChatSchema,
  "privateChats"
);

export { PrivateChatModel };
