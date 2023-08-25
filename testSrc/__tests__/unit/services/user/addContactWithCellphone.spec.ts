import chai from "chai";
import { extractor } from "utility-store";

import { services } from "~/services";
import { ContactItemWithCellphone } from "~/types/datatypes";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";

describe("addContactWithCellphone success test", () => {
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
