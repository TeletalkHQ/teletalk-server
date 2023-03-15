import { Document, model, Model, Schema } from "mongoose";

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

const PrivateChatSchema = new Schema<IPrivateChatDoc, IPrivateChatModel>({
  chatId: {
    maxlength: chatIdMaker("maxlength"),
    minlength: chatIdMaker("minlength"),
    required: chatIdMaker("required"),
    type: "string",
    unique: chatNativeModels.chatId.required.value,
  },
  createdAt: {
    required: chatNativeModels.createdAt.required.value,
    type: "number",
  },
  messages: [
    {
      createdAt: {
        required: chatNativeModels.createdAt.required.value,
        type: "number",
      },
      message: {
        maxlength: messageTextMaker("maxlength"),
        minlength: messageTextMaker("minlength"),
        required: chatNativeModels.messageText.required.value,
        type: "string",
      },
      messageId: {
        maxlength: messageIdMaker("maxlength"),
        minlength: messageIdMaker("minlength"),
        required: chatNativeModels.messageId.required.value,
        trim: chatNativeModels.messageId.trim.value,
        type: "string",
      },
      sender: {
        senderId: {
          maxlength: participantIdMaker("maxlength"),
          minlength: participantIdMaker("minlength"),
          required: chatNativeModels.participantId.required.value,
          trim: chatNativeModels.participantId.trim.value,
          type: "string",
        },
      },
    },
  ],
  participants: [
    {
      participantId: {
        maxlength: participantIdMaker("maxlength"),
        minlength: participantIdMaker("minlength"),
        required: chatNativeModels.participantId.required.value,
        trim: chatNativeModels.participantId.trim.value,
        type: "string",
      },
    },
  ],
});

const PrivateChat = model<IPrivateChatDoc, IPrivateChatModel>(
  "PrivateChat",
  PrivateChatSchema,
  "privateChats"
);

export { PrivateChat, PrivateChatSchema };
