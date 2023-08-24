import chai from "chai";
import { extractor } from "utility-store";

import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";

describe("addContactWithCellphone success test", () => {
	it("should add new contact with cellphone", async () => {
		const { user: currentUser } = await randomMaker.user();
		const { user: targetUser } = await randomMaker.user();

		const addingContact = {
			...extractor.cellphone(targetUser),
			...randomMaker.fullName(),
		};

		await services.addContactWithCellphone({
			addingContact,
			currentUserId: currentUser.userId,
		});

		const contacts = await services.getContacts({
			currentUserId: currentUser.userId,
		});

		chai.expect(contacts.length).to.be.equal(1);

		assertionInitializerHelper().contactsWithCellphone({
			testValue: contacts,
			equalValue: [addingContact],
		});
	});
});
