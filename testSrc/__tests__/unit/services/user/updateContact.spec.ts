import { ContactItem } from "utility-store/lib/types";

import { extractor } from "~/classes/Extractor";
import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(`${services.removeContact.name} success tests`, () => {
	it(
		utils.createTestMessage.unitSuccessTest(
			"updateContact",
			"should update contact"
		),
		async () => {
			const { user: currentUser } = await randomMaker.user();

			const updatingContacts: ContactItem[] = [];

			const length = 10;
			const users = await Promise.all(randomMaker.batchUsers(length));

			for (const { user: targetUser } of users) {
				const addingContact = extractor.contact(targetUser);

				await services.addContactWithCellphone({
					addingContact,
					currentUserId: currentUser.userId,
				});

				updatingContacts.push(addingContact);
			}

			for (const [index, { user: targetUser }] of users.entries()) {
				const editValues = randomMaker.fullName();

				await services.updateContact({
					targetUserId: targetUser.userId,
					currentUserId: currentUser.userId,
					editValues,
				});

				updatingContacts[index] = {
					...targetUser,
					...editValues,
				};

				const contacts = await services.getContacts({
					userId: currentUser.userId,
				});

				assertionInitializerHelper().contactsWithUserId({
					testValue: contacts,
					equalValue: updatingContacts,
				});
			}
		}
	);
});

describe(`${services.removeContact.name} fail tests`, () => {
	it(
		utils.createTestMessage.unitFailTest(
			"updateContact",
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
			"updateContact",
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
