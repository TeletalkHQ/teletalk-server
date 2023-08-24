import { RandomMaker as RandomMakerMain } from "utility-store";
import { ContactItem } from "utility-store/lib/types";

import { models } from "~/models";

import { authHelper } from "@/classes/AuthHelper";
import { utils } from "@/utils";

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

	async user(cellphone = this.unusedCellphone(), fullName = this.fullName()) {
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
		const users = [];
		for (let i = 0; i < length; i++) {
			const user = await this.user();
			users.push(user);
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
