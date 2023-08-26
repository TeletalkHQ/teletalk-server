import { extractor } from "~/classes/Extractor";
import { services } from "~/services";
import { ContactItemWithCellphone } from "~/types/datatypes";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(`${services.addContactWithCellphone.name} success tests`, () => {
	it("should add new contact with cellphone", async () => {
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

			await services.addContactWithCellphone({
				addingContact: item,
				currentUserId: currentUser.userId,
			});

			const contacts = await services.getContacts({
				userId: currentUser.userId,
			});

			assertionInitializerHelper().contactsWithCellphone({
				testValue: contacts,
				equalValue: addingContacts,
			});
		}
	});
});

describe(`${services.addContactWithCellphone.name} fail tests`, () => {
	it(utils.createUnitFailTestMessage("CONTACT_ITEM_EXIST"), async () => {
		const { user: currentUser } = await randomMaker.user();
		const { user: targetUser } = await randomMaker.user();

		const targetContact: ContactItemWithCellphone = {
			...extractor.cellphone(targetUser),
			...randomMaker.fullName(),
		};

		await services.addContactWithCellphone({
			currentUserId: currentUser.userId,
			addingContact: targetContact,
		});

		await utils.expectToFail_async(async () => {
			await services.addContactWithCellphone({
				currentUserId: currentUser.userId,
				addingContact: targetContact,
			});
		}, "CONTACT_ITEM_EXIST");
	});

	it(utils.createUnitFailTestMessage("TARGET_USER_NOT_EXIST"), async () => {
		const { user: currentUser } = await randomMaker.user();

		const targetContact = randomMaker.contactWithCellphone();

		await utils.expectToFail_async(async () => {
			await services.addContactWithCellphone({
				currentUserId: currentUser.userId,
				addingContact: targetContact,
			});
		}, "TARGET_USER_NOT_EXIST");
	});

	it(utils.createUnitFailTestMessage("CURRENT_USER_NOT_EXIST"), async () => {
		const targetContact = randomMaker.contactWithCellphone();

		await utils.expectToFail_async(async () => {
			await services.addContactWithCellphone({
				currentUserId: randomMaker.userId(),
				addingContact: targetContact,
			});
		}, "CURRENT_USER_NOT_EXIST");
	});
});
