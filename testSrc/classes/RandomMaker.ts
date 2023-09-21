import { Socket } from "socket.io-client";
import {
	Cellphone,
	ClientId,
	ContactItem,
	ContactItemWithoutUserId,
	FullNameWithUserId,
	MessageItem,
	MessageText,
	UserData,
	UserId,
	UserPublicData,
} from "teletalk-type-store";
import { RandomMaker as RandomMakerMain } from "utility-store";

import { models } from "~/models";

import { authHelper } from "@/classes/AuthHelper";
import { utils } from "@/utils";

interface CreatedUser {
	user: UserData;
	socket: Socket;
}

class RandomMaker extends RandomMakerMain {
	constructor() {
		super();
	}

	clientId(): ClientId {
		return super.string(models.native.clientId.maxLength);
	}

	contact(): ContactItem {
		return super.contact(
			models.native.firstName.maxLength,
			models.native.lastName.maxLength,
			models.native.userId.maxLength,
			models.native.phoneNumber.maxLength
		);
	}

	contactWithCellphone(): ContactItemWithoutUserId {
		const { userId, ...rest } = this.contact();
		return rest;
	}

	contactWithUserId(): FullNameWithUserId {
		const contact = this.contact();
		return {
			firstName: contact.firstName,
			lastName: contact.lastName,
			userId: contact.userId,
		};
	}

	fullName() {
		return super.fullName(
			models.native.firstName.maxLength,
			models.native.lastName.maxLength
		);
	}

	userId() {
		return super.id(models.native.userId.maxLength);
	}

	async user(
		cellphone = this.unusedCellphone(),
		fullName = this.fullName()
	): Promise<CreatedUser> {
		const ah = authHelper(cellphone, fullName);
		await ah.createComplete();

		const response = await utils.requesterCollection
			.getUserData(ah.getClientSocket())
			.emitFull();

		return {
			...ah.getResponses().create.data,
			user: response.data.user,
			socket: ah.getClientSocket(),
		};
	}

	async users(length: number, cellphone?: Cellphone) {
		const users: CreatedUser[] = [];
		for (let i = 0; i < length; i++) users.push(await this.user(cellphone));

		return users;
	}

	batchUsers(length: number, cellphone?: Cellphone) {
		const users: Promise<CreatedUser>[] = [];
		for (let i = 0; i < length; i++) users.push(this.user(cellphone));

		return users;
	}

	async sockets(length: number, cellphone = this.cellphone()) {
		const sockets = [];

		for (let i = 0; i < length; i++) {
			const ah = authHelper(cellphone);
			await ah.signIn();
			await ah.verify();

			sockets.push({
				socket: ah.getClientSocket(),
			});
		}

		return sockets;
	}

	userPublicData(): UserPublicData {
		return {
			...randomMaker.fullName(),
			bio: randomMaker.string(models.native.bio.maxLength),
			username: randomMaker.string(models.native.username.maxLength),
			userId: super.id(models.native.userId.maxLength),
		};
	}

	usersPublicData(length: number, userId?: UserId): UserPublicData[] {
		const data: UserPublicData[] = [];

		for (let i = 0; i < length; i++) {
			const publicData = this.userPublicData();
			data.push({
				...publicData,
				userId: userId || publicData.userId,
			});
		}
		return data;
	}

	unusedContact(): ContactItem {
		return super.unusedContact(
			models.native.firstName.maxLength,
			models.native.lastName.minLength,
			models.native.userId.maxLength
		);
	}

	privateMessage(): MessageItem {
		return {
			createdAt: Date.now(),
			messageId: super.id(models.native.messageId.maxLength),
			messageText: this.messageText(),
			sender: {
				senderId: this.userId(),
			},
		};
	}

	messageText(): MessageText {
		return super.string(models.native.messageText.maxLength);
	}
}

export const randomMaker = new RandomMaker();
