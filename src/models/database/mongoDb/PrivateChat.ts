import { Document, model, Model, Schema } from "mongoose";

// import { mongooseUniqueValidator } from "@/plugins/mongoose";

import { nativeModels } from "@/models/native";

import { NativeModel, PrivateChatMongo } from "@/types";

type IPrivateChatDoc = PrivateChatMongo & Document;
type IPrivateChatModel = Model<IPrivateChatDoc>;

const chatNativeModels = nativeModels.chat;

function makePropValue(prop: NativeModel) {
  return function <T extends keyof NativeModel>(
    key: T
  ): [NativeModel[T]["value"], string] {
    return [prop[key].value, prop[key].error?.reason as string];
  };
}

const chatIdMaker = makePropValue(chatNativeModels.chatId);
const messageMaker = makePropValue(chatNativeModels.messageText);
const messageIdMaker = makePropValue(chatNativeModels.messageId);
const participantIdMaker = makePropValue(chatNativeModels.participantId);

const PrivateChatSchema = new Schema<IPrivateChatDoc, IPrivateChatModel>({
  chatId: {
    type: String,
    required: chatIdMaker("required"),
    minlength: chatIdMaker("minlength"),
    maxlength: chatIdMaker("maxlength"),
    unique: chatNativeModels.chatId.required.value,
  },
  createdAt: {
    required: chatNativeModels.createdAt.required.value,
    type: Number,
  },
  messages: [
    {
      createdAt: {
        required: chatNativeModels.createdAt.required.value,
        type: Number,
      },
      message: {
        type: String,
        minlength: messageMaker("minlength"),
        maxlength: messageMaker("maxlength"),
        required: chatNativeModels.messageText.required.value,
      },
      messageId: {
        type: String,
        minlength: messageIdMaker("minlength"),
        maxlength: messageIdMaker("maxlength"),
        trim: chatNativeModels.messageId.trim.value,
        required: chatNativeModels.messageId.required.value,
      },
      sender: {
        senderId: {
          type: String,
          minlength: participantIdMaker("minlength"),
          maxlength: participantIdMaker("maxlength"),
          trim: chatNativeModels.participantId.trim.value,
          required: chatNativeModels.participantId.required.value,
        },
      },
    },
  ],
  participants: [
    {
      participantId: {
        type: String,
        minlength: participantIdMaker("minlength"),
        maxlength: participantIdMaker("maxlength"),
        trim: chatNativeModels.participantId.trim.value,
        required: chatNativeModels.participantId.required.value,
      },
    },
  ],
});

// PrivateChatSchema.plugin(mongooseUniqueValidator);

const PrivateChat = model<IPrivateChatDoc, IPrivateChatModel>(
  "PrivateChat",
  PrivateChatSchema,
  "privateChats"
);

export { PrivateChat, PrivateChatSchema };
