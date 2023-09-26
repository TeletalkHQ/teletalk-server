import { Schema, model } from "mongoose";

import { IPrivateChatDoc, IPrivateChatModel } from "~/types/model";

import { schemas } from "./schema";

const { chatId, createdAt, messageId, messageText, participantId, senderId } =
	schemas;

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
