import chai from "chai";
import { extractor } from "utility-store";

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
				currentUserId: currentUser.userId,
			});

			chai.expect(contacts.length).to.be.equal(addingContacts.length);

			assertionInitializerHelper().contactsWithCellphone({
				testValue: contacts,
				equalValue: addingContacts,
			});
		}
	});
});

describe(`${services.addContactWithCellphone.name} fail tests`, () => {
	it("should throw error when contact already exists", async () => {
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

	it("should throw error when target user with specified cellphone does not exists", async () => {
		const { user: currentUser } = await randomMaker.user();

		const targetContact = randomMaker.contactWithCellphone();

		await utils.expectToFail_async(async () => {
			await services.addContactWithCellphone({
				currentUserId: currentUser.userId,
				addingContact: targetContact,
			});
		}, "TARGET_USER_NOT_EXIST");
	});

	it("should throw error when current user with specified userId does not exists", async () => {
		const targetContact = randomMaker.contactWithCellphone();

		await utils.expectToFail_async(async () => {
			await services.addContactWithCellphone({
				currentUserId: randomMaker.userId(),
				addingContact: targetContact,
			});
		}, "CURRENT_USER_NOT_EXIST");
	});
});
