import { ContactItem } from "teletalk-type-store";

import { extractor } from "~/classes/Extractor";
import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
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
				const { sessionId } = await randomMaker.serviceUser();

				const updatingContacts: ContactItem[] = [];

				const length = 10;
				const users = await Promise.all(randomMaker.serviceBatchUsers(length));

				for (const { user: targetUser } of users) {
					const { userId: targetUserId, ...addingContact } =
						extractor.contact(targetUser);

					await services.user.addContactWithCellphone({
						addingContact,
						currentSessionId: sessionId,
						targetUserCellphone: addingContact,
					});

					updatingContacts.push({ ...addingContact, userId: targetUserId });
				}

				for (const [index, { user: targetUser }] of users.entries()) {
					const editValues = randomMaker.fullName();

					await services.user.updateContact({
						targetUserId: targetUser.userId,
						currentSessionId: sessionId,
						editValues,
					});

					updatingContacts[index] = {
						...extractor.contact(targetUser),
						...editValues,
					};

					const { contacts } = await services.user.getContacts({
						currentSessionId: sessionId,
					});

					assertion().contactsWithUserId({
						testValue: contacts,
						equalValue: updatingContacts,
					});
				}
			}
		);
	}
);

await utils.generateServiceFailTest("updateContact", "CURRENT_USER_NOT_EXIST", {
	currentSessionId: randomMaker.sessionId(),
	editValues: randomMaker.fullName(),
	targetUserId: randomMaker.userId(),
});

await utils.generateServiceFailTest(
	"updateContact",
	"CONTACT_ITEM_NOT_EXIST",
	async () => {
		const { sessionId } = await randomMaker.serviceUser();

		return {
			currentSessionId: sessionId,
			editValues: randomMaker.fullName(),
			targetUserId: randomMaker.userId(),
		};
	}
);
