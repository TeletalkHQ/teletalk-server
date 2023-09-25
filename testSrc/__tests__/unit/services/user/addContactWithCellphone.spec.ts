import { ContactItemWithoutUserId } from "teletalk-type-store";

import { extractor } from "~/classes/Extractor";
import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.unitSuccessDescribe(
		"addContactWithCellphone",
		"service"
	),
	() => {
		it(
			utils.createTestMessage.unitSuccessTest(
				"addContactWithCellphone",
				"service",
				"should add new contact with cellphone"
			),
			async () => {
				const { sessionId } = await randomMaker.serviceUser();

				const addingContacts: ContactItemWithoutUserId[] = [];

				const length = 10;
				const users = await Promise.all(randomMaker.serviceBatchUsers(length));

				for (const { user: targetUser } of users) {
					const item: ContactItemWithoutUserId = {
						...extractor.cellphone(targetUser),
						...randomMaker.fullName(),
					};

					addingContacts.push(item);

					await services.user.addContactWithCellphone({
						addingContact: item,
						currentSessionId: sessionId,
						targetUserCellphone: item,
					});

					const { contacts } = await services.user.getContacts({
						currentSessionId: sessionId,
					});

					assertion().contactsWithCellphone({
						testValue: contacts,
						equalValue: addingContacts,
					});
				}
			}
		);
	}
);

await utils.generateServiceFailTest(
	"addContactWithCellphone",
	"CURRENT_USER_NOT_EXIST",
	{
		currentSessionId: randomMaker.sessionId(),
		addingContact: randomMaker.contactWithCellphone(),
		targetUserCellphone: randomMaker.contactWithCellphone(),
	}
);

await utils.generateServiceFailTest(
	"addContactWithCellphone",
	"TARGET_USER_NOT_EXIST",
	async () => {
		const { sessionId } = await randomMaker.serviceUser();

		return {
			currentSessionId: sessionId,
			addingContact: randomMaker.contactWithCellphone(),
			targetUserCellphone: randomMaker.contactWithCellphone(),
		};
	}
);

await utils.generateServiceFailTest(
	"addContactWithCellphone",
	"CONTACT_ITEM_EXIST",
	async () => {
		const { sessionId } = await randomMaker.serviceUser();
		const { user: targetUser } = await randomMaker.serviceUser();

		const targetContact: ContactItemWithoutUserId = {
			...extractor.cellphone(targetUser),
			...randomMaker.fullName(),
		};

		await services.user.addContactWithCellphone({
			currentSessionId: sessionId,
			addingContact: targetContact,
			targetUserCellphone: targetContact,
		});

		return {
			currentSessionId: sessionId,
			addingContact: targetContact,
			targetUserCellphone: targetContact,
		};
	}
);
