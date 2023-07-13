import { Schema, SchemaDefinitionProperty, model } from "mongoose";

import { nativeModels } from "~/models/native";
import { IPrivateChatDoc, IPrivateChatModel } from "~/types/models";
import { utils } from "~/utils";

const chatIdMaker = utils.makeMongoSchemaValue("chatId");
const messageIdMaker = utils.makeMongoSchemaValue("messageId");
const messageTextMaker = utils.makeMongoSchemaValue("messageText");
const participantIdMaker = utils.makeMongoSchemaValue("participantId");

const chatId: SchemaDefinitionProperty = {
  maxlength: chatIdMaker("maxLength"),
  minlength: chatIdMaker("minLength"),
  required: chatIdMaker("required"),
  type: "string",
  unique: nativeModels.chatId.required,
};

const createdAt: SchemaDefinitionProperty = {
  required: nativeModels.createdAt.required,
  type: "number",
};

const messageText: SchemaDefinitionProperty = {
  maxlength: messageTextMaker("maxLength"),
  minlength: messageTextMaker("minLength"),
  required: nativeModels.messageText.required,
  type: "string",
};

const messageId: SchemaDefinitionProperty = {
  maxlength: messageIdMaker("maxLength"),
  minlength: messageIdMaker("minLength"),
  required: nativeModels.messageId.required,
  trim: nativeModels.messageId.trim,
  type: "string",
};

const participantId: SchemaDefinitionProperty = {
  maxlength: participantIdMaker("maxLength"),
  minlength: participantIdMaker("minLength"),
  required: nativeModels.participantId.required,
  trim: nativeModels.participantId.trim,
  type: "string",
};

const senderId: SchemaDefinitionProperty = {
  maxlength: participantIdMaker("maxLength"),
  minlength: participantIdMaker("minLength"),
  required: nativeModels.participantId.required,
  trim: nativeModels.participantId.trim,
  type: "string",
};

const PrivateChatSchema = new Schema<IPrivateChatDoc, IPrivateChatModel>({
  chatId,
  createdAt,
  messages: [
    {
      createdAt,
      messageId,
      messageText,
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

export const PrivateChatModel = model<IPrivateChatDoc, IPrivateChatModel>(
  "PrivateChat",
  PrivateChatSchema,
  "privateChats"
);
