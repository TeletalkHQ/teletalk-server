import { Schema, model } from "mongoose";

import { IUserDoc, IUserModel } from "~/types/model";

import { schemas } from "./schema";

const {
	avatarSrc,
	bio,
	countryCode,
	createdAt,
	countryName,
	firstName,
	isActive,
	lastName,
	phoneNumber,
	sessionId,
	userId,
	username,
} = schemas;

const userSchema = new Schema<IUserDoc, IUserModel>({
	avatarSrc,
	bio,
	blacklist: [
		{
			userId: {
				...userId,
				unique: false,
			},
		},
	],
	contacts: [
		{
			firstName,
			lastName,
			userId: {
				...userId,
				unique: false,
			},
			isCellphoneAccessible: {
				type: "boolean",
				required: true,
			},
		},
	],
	countryCode: { ...countryCode, unique: false },
	countryName: { ...countryName, unique: false },
	createdAt,
	firstName,
	lastName,
	phoneNumber: { ...phoneNumber, unique: false },
	sessions: [
		{
			sessionId: { ...sessionId, unique: false },
		},
	],
	status: {
		isActive,
	},
	userId,
	username,
});

Schema.Types.String.checkRequired((v) => {
	return v !== null || v !== undefined;
});

export const UserModel = model<IUserDoc, IUserModel>(
	"User",
	userSchema,
	"users"
);
