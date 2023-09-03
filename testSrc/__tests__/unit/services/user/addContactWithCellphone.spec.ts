import { extractor } from "~/classes/Extractor";
import { services } from "~/services";
import { ContactItemWithCellphone } from "~/types/datatypes";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
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
				const { user: currentUser } = await randomMaker.user();

				const addingContacts: ContactItemWithCellphone[] = [];

				const length = 10;
				const users = await Promise.all(randomMaker.batchUsers(length));

				for (const { user: targetUser } of users) {
					const item: ContactItemWithCellphone = {
						...extractor.cellphone(targetUser),
						...randomMaker.fullName(),
					};

					addingContacts.push(item);

					await services.user.addContactWithCellphone({
						addingContact: item,
						currentUserId: currentUser.userId,
						targetCellphone: item,
					});

					const { contacts } = await services.user.getContacts({
						currentUserId: currentUser.userId,
					});

					assertionInitializerHelper().contactsWithCellphone({
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
		currentUserId: randomMaker.userId(),
		addingContact: randomMaker.contactWithCellphone(),
		targetCellphone: randomMaker.contactWithCellphone(),
	}
);

await utils.generateServiceFailTest(
	"addContactWithCellphone",
	"TARGET_USER_NOT_EXIST",
	async () => {
		const { user: currentUser } = await randomMaker.user();

		return {
			currentUserId: currentUser.userId,
			addingContact: randomMaker.contactWithCellphone(),
			targetCellphone: randomMaker.contactWithCellphone(),
		};
	}
);

await utils.generateServiceFailTest(
	"addContactWithCellphone",
	"CONTACT_ITEM_EXIST",
	async () => {
		const { user: currentUser } = await randomMaker.user();
		const { user: targetUser } = await randomMaker.user();

		const targetContact: ContactItemWithCellphone = {
			...extractor.cellphone(targetUser),
			...randomMaker.fullName(),
		};

		await services.user.addContactWithCellphone({
			currentUserId: currentUser.userId,
			addingContact: targetContact,
			targetCellphone: targetContact,
		});

		return {
			currentUserId: currentUser.userId,
			addingContact: targetContact,
			targetCellphone: targetContact,
		};
	}
);
