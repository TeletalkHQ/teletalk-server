import { Socket } from "socket.io-client";
import { RandomMaker as RandomMakerMain } from "utility-store";
import { ContactItem, UserData } from "utility-store/lib/types";

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

	contact(): ContactItem {
		return super.contact(
			models.native.firstName.maxLength,
			models.native.lastName.maxLength,
			models.native.userId.maxLength,
			models.native.phoneNumber.maxLength
		);
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
		const helper = authHelper(cellphone, fullName);
		await helper.createComplete();

		const response = await utils.requesterCollection
			.getUserData(helper.getClientSocket())
			.sendFullFeaturedRequest();

		return {
			...helper.getResponses().create.data,
			user: response.data.user,
			socket: helper.getClientSocket(),
		};
	}

	async users(length: number) {
		const users: CreatedUser[] = [];
		for (let i = 0; i < length; i++) {
			users.push(await this.user());
		}
		return users;
	}

	batchUsers(length: number) {
		const users: Promise<CreatedUser>[] = [];
		for (let i = 0; i < length; i++) {
			users.push(this.user());
		}
		return users;
	}

	publicUserData() {
		return {
			...randomMaker.fullName(),
			bio: randomMaker.string(models.native.bio.maxLength),
			username: randomMaker.string(models.native.username.maxLength),
			userId: super.id(models.native.userId.maxLength),
		};
	}

	unusedContact(): ContactItem {
		return super.unusedContact(
			models.native.firstName.maxLength,
			models.native.lastName.minLength,
			models.native.userId.maxLength
		);
	}
}

export const randomMaker = new RandomMaker();
