import { FullNameWithUserId } from "utility-store/lib/types";

import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.unitSuccessDescribe(
		"addContactWithUserId",
		"service"
	),
	() => {
		it(
			utils.createTestMessage.unitSuccessTest(
				"addContactWithUserId",
				"service",
				"should add new contact with target user id"
			),
			async () => {
				const { user: currentUser } = await randomMaker.user();

				const addingContacts: FullNameWithUserId[] = [];

				const length = 10;
				const users = await Promise.all(randomMaker.batchUsers(length));

				for (const { user: targetUser } of users) {
					const item: FullNameWithUserId = {
						...randomMaker.fullName(),
						userId: targetUser.userId,
					};

					addingContacts.push(item);

					await services.user.addContactWithUserId({
						fullName: item,
						currentUserId: currentUser.userId,
						targetUserId: item.userId,
					});

					const contacts = await services.user.getContacts({
						currentUserId: currentUser.userId,
					});

					assertionInitializerHelper().contactsWithUserId({
						testValue: contacts,
						equalValue: addingContacts,
					});
				}
			}
		);
	}
);

await utils.generateServiceFailTest(
	"addContactWithUserId",
	"CONTACT_ITEM_EXIST",
	async () => {
		const { user: currentUser } = await randomMaker.user();
		const { user: targetUser } = await randomMaker.user();

		const targetContact: FullNameWithUserId = {
			...randomMaker.fullName(),
			userId: targetUser.userId,
		};

		await services.user.addContactWithUserId({
			currentUserId: currentUser.userId,
			fullName: targetContact,
			targetUserId: targetContact.userId,
		});

		return {
			currentUserId: currentUser.userId,
			fullName: targetContact,
			targetUserId: targetUser.userId,
		};
	}
);

await utils.generateServiceFailTest(
	"addContactWithUserId",
	"CURRENT_USER_NOT_EXIST",
	{
		currentUserId: randomMaker.userId(),
		fullName: randomMaker.fullName(),
		targetUserId: randomMaker.userId(),
	}
);

await utils.generateServiceFailTest(
	"addContactWithUserId",
	"TARGET_USER_NOT_EXIST",
	async () => {
		const { user: currentUser } = await randomMaker.user();

		return {
			currentUserId: currentUser.userId,
			fullName: randomMaker.fullName(),
			targetUserId: randomMaker.userId(),
		};
	}
);
