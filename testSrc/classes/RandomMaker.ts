import { Socket } from "socket.io-client";
import {
	Cellphone,
	ContactItem,
	ContactItemWithoutUserId,
	DBUserData,
	FullNameWithUserId,
	MessageItem,
	MessageText,
	SessionId,
	Sessions,
	UserData,
	UserDataWithoutSessions,
	UserId,
	UserPublicData,
} from "teletalk-type-store";
import { RandomMaker as RandomMakerMain } from "utility-store";

import { sessionManager } from "~/classes/SessionManager";
import { userUtils } from "~/classes/UserUtils";
import { models } from "~/models";

import { authHelper } from "@/classes/AuthHelper";
import { services } from "@/services";
import { utils } from "@/utils";

interface E2EUser {
	user: UserDataWithoutSessions;
	socket: Socket;
}

interface ServiceUser {
	user: UserData;
	sessionId: SessionId;
}

class RandomMaker extends RandomMakerMain {
	constructor() {
		super();
	}

	sessionId(): SessionId {
		return super.string(models.native.sessionId.maxLength);
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

	async e2eUser(
		cellphone = this.unusedCellphone(),
		fullName = this.fullName()
	): Promise<E2EUser> {
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

	async e2eUsers(length: number) {
		const users: E2EUser[] = [];
		for (let i = 0; i < length; i++) users.push(await this.e2eUser());

		return users;
	}

	e2eBatchUsers(length: number, cellphone?: Cellphone) {
		const users: Promise<E2EUser>[] = [];
		for (let i = 0; i < length; i++) users.push(this.e2eUser(cellphone));

		return users;
	}

	async serviceUser(
		cellphone = this.unusedCellphone(),
		fullName = this.fullName()
	): Promise<ServiceUser> {
		const sessionId = sessionManager.generateSessionId();

		const userData: DBUserData = {
			...userUtils.getDBDefaultUserData(),
			...cellphone,
			...fullName,
			userId: randomMaker.userId(),
			sessions: [
				{
					sessionId,
				},
			],
		};

		await services.user.createNewUser(userData);

		return {
			sessionId,
			user: {
				...userData,
				contacts: [],
			},
		};
	}

	async serviceUsers(length: number) {
		const users: ServiceUser[] = [];

		for (let i = 0; i < length; i++) users.push(await this.serviceUser());

		return users;
	}

	serviceBatchUsers(length: number) {
		const users: Promise<ServiceUser>[] = [];

		for (let i = 0; i < length; i++) users.push(this.serviceUser());

		return users;
	}

	async sockets(length: number, cellphone = this.unusedCellphone()) {
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

	async sessions(length: number, userId: UserId) {
		const sessions: Sessions = [];

		for (let i = 0; i < length; i++) {
			const sessionId = sessionManager.generateSessionId();
			await services.user.addSession({
				currentUserId: userId,
				sessionId,
			});

			sessions.push({
				sessionId,
			});
		}

		return sessions;
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
