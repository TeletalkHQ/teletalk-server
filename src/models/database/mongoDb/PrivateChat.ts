import {
  Document,
  model,
  Model,
  Schema,
  SchemaDefinitionProperty,
} from "mongoose";

import { makeMongoSchemaValue } from "@/helpers/makeMongoSchemaValue";

import { nativeModels } from "@/models/native";

import { PrivateChatMongo } from "@/types";

type IPrivateChatDoc = PrivateChatMongo & Document;
type IPrivateChatModel = Model<IPrivateChatDoc>;

const chatNativeModels = nativeModels.privateChat;

const chatIdMaker = makeMongoSchemaValue(chatNativeModels.chatId);
const messageIdMaker = makeMongoSchemaValue(chatNativeModels.messageId);
const messageTextMaker = makeMongoSchemaValue(chatNativeModels.messageText);
const participantIdMaker = makeMongoSchemaValue(chatNativeModels.participantId);

const chatId: SchemaDefinitionProperty = {
  maxlength: chatIdMaker("maxlength"),
  minlength: chatIdMaker("minlength"),
  required: chatIdMaker("required"),
  type: "string",
  unique: chatNativeModels.chatId.required.value,
};

const createdAt: SchemaDefinitionProperty = {
  required: chatNativeModels.createdAt.required.value,
  type: "number",
};

const messageText: SchemaDefinitionProperty = {
  maxlength: messageTextMaker("maxlength"),
  minlength: messageTextMaker("minlength"),
  required: chatNativeModels.messageText.required.value,
  type: "string",
};

const messageId: SchemaDefinitionProperty = {
  maxlength: messageIdMaker("maxlength"),
  minlength: messageIdMaker("minlength"),
  required: chatNativeModels.messageId.required.value,
  trim: chatNativeModels.messageId.trim.value,
  type: "string",
};

const participantId: SchemaDefinitionProperty = {
  maxlength: participantIdMaker("maxlength"),
  minlength: participantIdMaker("minlength"),
  required: chatNativeModels.participantId.required.value,
  trim: chatNativeModels.participantId.trim.value,
  type: "string",
};

const senderId: SchemaDefinitionProperty = {
  maxlength: participantIdMaker("maxlength"),
  minlength: participantIdMaker("minlength"),
  required: chatNativeModels.participantId.required.value,
  trim: chatNativeModels.participantId.trim.value,
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
