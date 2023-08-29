import { FullNameWithUserId } from "utility-store/lib/types";

import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(`${services.addContactWithUserId.name} success tests`, () => {
	it(
		utils.createTestMessage.unitSuccessTest(
			"addContactWithUserId",
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

				await services.addContactWithUserId({
					addingContact: item,
					currentUserId: currentUser.userId,
				});

				const contacts = await services.getContacts({
					userId: currentUser.userId,
				});

				assertionInitializerHelper().contactsWithUserId({
					testValue: contacts,
					equalValue: addingContacts,
				});
			}
		}
	);
});

describe(`${services.addContactWithUserId.name} fail tests`, () => {
	it(
		utils.createTestMessage.unitFailTest(
			"addContactWithUserId",
			"CONTACT_ITEM_EXIST"
		),
		async () => {
			const { user: currentUser } = await randomMaker.user();
			const { user: targetUser } = await randomMaker.user();

			const targetContact: FullNameWithUserId = {
				...randomMaker.fullName(),
				userId: targetUser.userId,
			};

			await services.addContactWithUserId({
				currentUserId: currentUser.userId,
				addingContact: targetContact,
			});

			await utils.expectToFail_async(async () => {
				await services.addContactWithUserId({
					currentUserId: currentUser.userId,
					addingContact: targetContact,
				});
			}, "CONTACT_ITEM_EXIST");
		}
	);

	it(
		utils.createTestMessage.unitFailTest(
			"addContactWithUserId",
			"TARGET_USER_NOT_EXIST"
		),
		async () => {
			const { user: currentUser } = await randomMaker.user();

			const targetContact = randomMaker.contactWithUserId();

			await utils.expectToFail_async(async () => {
				await services.addContactWithUserId({
					currentUserId: currentUser.userId,
					addingContact: targetContact,
				});
			}, "TARGET_USER_NOT_EXIST");
		}
	);

	it(
		utils.createTestMessage.unitFailTest(
			"addContactWithUserId",
			"CURRENT_USER_NOT_EXIST"
		),
		async () => {
			const targetContact = randomMaker.contactWithUserId();

			await utils.expectToFail_async(async () => {
				await services.addContactWithUserId({
					currentUserId: randomMaker.userId(),
					addingContact: targetContact,
				});
			}, "CURRENT_USER_NOT_EXIST");
		}
	);
});
