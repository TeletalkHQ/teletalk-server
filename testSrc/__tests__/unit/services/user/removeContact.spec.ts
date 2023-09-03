import { FullNameWithUserId, UserData } from "utility-store/lib/types";

import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.unitSuccessDescribe("removeContact", "service"),
	() => {
		it(
			utils.createTestMessage.unitSuccessTest(
				"removeContact",
				"service",
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

					await services.user.addContactWithUserId({
						currentUserId: currentUser.userId,
						fullName: addingContact,
						targetUserId: addingContact.userId,
					});

					removingContacts.push(addingContact);
				}

				for (const { user: targetUser } of [...users]) {
					await services.user.removeContact({
						targetUserId: targetUser.userId,
						currentUserId: currentUser.userId,
					});

					removingContacts.shift();

					const { contacts } = (await services.user.findByUserId({
						currentUserId: currentUser.userId,
					})) as UserData;

					assertionInitializerHelper().contactsWithUserId({
						testValue: contacts,
						equalValue: removingContacts,
					});
				}
			}
		);
	}
);

await utils.generateServiceFailTest("removeContact", "CURRENT_USER_NOT_EXIST", {
	currentUserId: randomMaker.userId(),
	targetUserId: randomMaker.userId(),
});

await utils.generateServiceFailTest(
	"removeContact",
	"CONTACT_ITEM_NOT_EXIST",
	async () => {
		const { user: currentUser } = await randomMaker.user();

		return {
			currentUserId: currentUser.userId,
			targetUserId: randomMaker.userId(),
		};
	}
);
