import chai from "chai";
import { extractor } from "utility-store";
import { ContactItem, Contacts } from "utility-store/lib/types";

import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";
import { FIELD_TYPE } from "@/variables";

describe("getContacts success tests", () => {
	it("", async () => {
		const { user: currentUser, socket } = await randomMaker.user();

		const contactsLength = 10;
		const users = await randomMaker.users(contactsLength);
		const addingContacts = users.map((i) => extractor.contact(i.user));

		const addContactRequester = utils.requesterCollection.addContact(socket);

		for (const contact of addingContacts) {
			await addContactRequester.sendFullFeaturedRequest(contact);
		}

		const savedContacts = (await services.getUserContacts({
			currentUserId: currentUser.userId,
		}))!;

		testContacts(addingContacts, savedContacts);

		const getContactsRequester = utils.requesterCollection.getContacts(socket);
		const {
			data: { contacts: contactsFromEvent },
		} = await getContactsRequester.sendFullFeaturedRequest();
		testContacts(addingContacts, contactsFromEvent as Contacts);
	});
});

const testContacts = (addingContacts: Contacts, savedContacts: Contacts) => {
	chai.expect(savedContacts).to.be.an(FIELD_TYPE.ARRAY);
	chai.expect(savedContacts.length).to.be.equal(addingContacts.length);

	addingContacts.forEach((i) => {
		const savedContact = savedContacts.find((j) => i.userId === j.userId)!;

		testOneContact(i, savedContact);
	});
};

const testOneContact = (testValue: ContactItem, equalValue: ContactItem) => {
	assertionInitializerHelper()
		.userId({
			equalValue: equalValue.userId,
			testValue: testValue.userId,
		})
		.countryCode({
			equalValue: equalValue.countryCode,
			testValue: testValue.countryCode,
		})
		.countryName({
			equalValue: equalValue.countryName,
			testValue: testValue.countryName,
		})
		.phoneNumber({
			equalValue: equalValue.phoneNumber,
			testValue: testValue.phoneNumber,
		})
		.lastName({
			equalValue: equalValue.lastName,
			testValue: testValue.lastName,
		})
		.firstName({
			equalValue: equalValue.firstName,
			testValue: testValue.firstName,
		});
};
