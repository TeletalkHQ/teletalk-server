import { model, Schema, SchemaDefinitionProperty } from "mongoose";

import { makeMongoSchemaValue } from "@/helpers/makeMongoSchemaValue";

import { nativeModels } from "@/models/native";

import { IPrivateChatDoc, IPrivateChatModel } from "@/types";

const chatIdMaker = makeMongoSchemaValue(nativeModels.chatId);
const messageIdMaker = makeMongoSchemaValue(nativeModels.messageId);
const messageTextMaker = makeMongoSchemaValue(nativeModels.messageText);
const participantIdMaker = makeMongoSchemaValue(nativeModels.participantId);

const chatId: SchemaDefinitionProperty = {
  maxlength: chatIdMaker("maxlength"),
  minlength: chatIdMaker("minlength"),
  required: chatIdMaker("required"),
  type: "string",
  unique: nativeModels.chatId.required.value,
};

const createdAt: SchemaDefinitionProperty = {
  required: nativeModels.createdAt.required.value,
  type: "number",
};

const messageText: SchemaDefinitionProperty = {
  maxlength: messageTextMaker("maxlength"),
  minlength: messageTextMaker("minlength"),
  required: nativeModels.messageText.required.value,
  type: "string",
};

const messageId: SchemaDefinitionProperty = {
  maxlength: messageIdMaker("maxlength"),
  minlength: messageIdMaker("minlength"),
  required: nativeModels.messageId.required.value,
  trim: nativeModels.messageId.trim.value,
  type: "string",
};

const participantId: SchemaDefinitionProperty = {
  maxlength: participantIdMaker("maxlength"),
  minlength: participantIdMaker("minlength"),
  required: nativeModels.participantId.required.value,
  trim: nativeModels.participantId.trim.value,
  type: "string",
};

const senderId: SchemaDefinitionProperty = {
  maxlength: participantIdMaker("maxlength"),
  minlength: participantIdMaker("minlength"),
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

const PrivateChat = model<IPrivateChatDoc, IPrivateChatModel>(
  "PrivateChat",
  PrivateChatSchema,
  "privateChats"
);

export { PrivateChat, PrivateChatSchema };
