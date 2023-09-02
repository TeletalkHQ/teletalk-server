import { ContactItem } from "utility-store/lib/types";

import { extractor } from "~/classes/Extractor";
import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.unitSuccessDescribe("updateContact", "service"),
	() => {
		it(
			utils.createTestMessage.unitSuccessTest(
				"updateContact",
				"service",
				"should update contact"
			),
			async () => {
				const { user: currentUser } = await randomMaker.user();

				const updatingContacts: ContactItem[] = [];

				const length = 10;
				const users = await Promise.all(randomMaker.batchUsers(length));

				for (const { user: targetUser } of users) {
					const { userId: targetUserId, ...addingContact } =
						extractor.contact(targetUser);

					await services.user.addContactWithCellphone({
						addingContact,
						currentUserId: currentUser.userId,
						targetCellphone: addingContact,
					});

					updatingContacts.push({ ...addingContact, userId: targetUserId });
				}

				for (const [index, { user: targetUser }] of users.entries()) {
					const editValues = randomMaker.fullName();

					await services.user.updateContact({
						targetUserId: targetUser.userId,
						currentUserId: currentUser.userId,
						editValues,
					});

					updatingContacts[index] = {
						...targetUser,
						...editValues,
					};

					const contacts = await services.user.getContacts({
						currentUserId: currentUser.userId,
					});

					assertionInitializerHelper().contactsWithUserId({
						testValue: contacts,
						equalValue: updatingContacts,
					});
				}
			}
		);
	}
);

describe(
	utils.createTestMessage.unitFailDescribe("updateContact", "service"),
	() => {
		it(
			utils.createTestMessage.unitFailTest(
				"updateContact",
				"service",
				"CONTACT_ITEM_NOT_EXIST"
			),
			async () => {
				const { user: currentUser } = await randomMaker.user();
				const { user: targetUser } = await randomMaker.user();

				await utils.expectToFail_async(async () => {
					await services.user.removeContact({
						currentUserId: currentUser.userId,
						targetUserId: targetUser.userId,
					});
				}, "CONTACT_ITEM_NOT_EXIST");
			}
		);

		it(
			utils.createTestMessage.unitFailTest(
				"updateContact",
				"service",
				"CURRENT_USER_NOT_EXIST"
			),
			async () => {
				await utils.expectToFail_async(async () => {
					await services.user.removeContact({
						currentUserId: randomMaker.userId(),
						targetUserId: randomMaker.userId(),
					});
				}, "CURRENT_USER_NOT_EXIST");
			}
		);
	}
);
