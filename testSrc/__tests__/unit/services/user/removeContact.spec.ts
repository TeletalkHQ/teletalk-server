import { FullNameWithUserId, UserData } from "utility-store/lib/types";

import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(`${services.removeContact.name} success tests`, () => {
	it(
		utils.createTestMessage.unitSuccessTest(
			"removeContact",
			"should remove contact with specified userId"
		),
		async () => {
			const { user: currentUser } = await randomMaker.user();

			const removingContacts: FullNameWithUserId[] = [];

			const length = 10;
			const users = await Promise.all(randomMaker.batchUsers(length));

			for (const { user: targetUser } of users) {
				const addingContact = {
					...randomMaker.fullName(),
					userId: targetUser.userId,
				};

				await services.addContactWithUserId({
					currentUserId: currentUser.userId,
					addingContact,
				});

				removingContacts.push(addingContact);
			}

			for (const { user: targetUser } of [...users]) {
				await services.removeContact({
					targetUserId: targetUser.userId,
					currentUserId: currentUser.userId,
				});

				removingContacts.shift();

				const { contacts } = (await services.findOneUser({
					userId: currentUser.userId,
				})) as UserData;

				assertionInitializerHelper().contactsWithUserId({
					testValue: contacts,
					equalValue: removingContacts,
				});
			}
		}
	);
});

describe(`${services.removeContact.name} fail tests`, () => {
	it(
		utils.createTestMessage.unitFailTest(
			"removeContact",
			"CONTACT_ITEM_NOT_EXIST"
		),
		async () => {
			const { user: currentUser } = await randomMaker.user();
			const { user: targetUser } = await randomMaker.user();

			await utils.expectToFail_async(async () => {
				await services.removeContact({
					currentUserId: currentUser.userId,
					targetUserId: targetUser.userId,
				});
			}, "CONTACT_ITEM_NOT_EXIST");
		}
	);

	it(
		utils.createTestMessage.unitFailTest(
			"removeContact",
			"CURRENT_USER_NOT_EXIST"
		),
		async () => {
			await utils.expectToFail_async(async () => {
				await services.removeContact({
					currentUserId: randomMaker.userId(),
					targetUserId: randomMaker.userId(),
				});
			}, "CURRENT_USER_NOT_EXIST");
		}
	);
});
