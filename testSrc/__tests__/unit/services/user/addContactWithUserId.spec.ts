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

describe(
	utils.createTestMessage.unitFailDescribe("addContactWithUserId", "service"),
	() => {
		it(
			utils.createTestMessage.unitFailTest(
				"addContactWithUserId",
				"service",
				"CONTACT_ITEM_EXIST"
			),
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

				await utils.expectToFail_async(async () => {
					await services.user.addContactWithUserId({
						currentUserId: currentUser.userId,
						fullName: targetContact,
						targetUserId: targetContact.userId,
					});
				}, "CONTACT_ITEM_EXIST");
			}
		);

		it(
			utils.createTestMessage.unitFailTest(
				"addContactWithUserId",
				"service",
				"TARGET_USER_NOT_EXIST"
			),
			async () => {
				const { user: currentUser } = await randomMaker.user();

				const targetContact = randomMaker.fullName();

				await utils.expectToFail_async(async () => {
					await services.user.addContactWithUserId({
						currentUserId: currentUser.userId,
						fullName: targetContact,
						targetUserId: randomMaker.userId(),
					});
				}, "TARGET_USER_NOT_EXIST");
			}
		);

		it(
			utils.createTestMessage.unitFailTest(
				"addContactWithUserId",
				"service",
				"CURRENT_USER_NOT_EXIST"
			),
			async () => {
				const targetContact = randomMaker.fullName();

				await utils.expectToFail_async(async () => {
					await services.user.addContactWithUserId({
						currentUserId: randomMaker.userId(),
						fullName: targetContact,
						targetUserId: randomMaker.userId(),
					});
				}, "CURRENT_USER_NOT_EXIST");
			}
		);
	}
);
