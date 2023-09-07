import { extractor } from "~/classes/Extractor";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.e2eSuccessDescribe("getContacts", "event"),
	() => {
		it(
			utils.createTestMessage.e2eSuccessTest(
				"getContacts",
				"event",
				"should get contacts"
			),
			async () => {
				const { socket } = await randomMaker.user();

				const { user: targetUser } = await randomMaker.user();
				const addingContact = extractor.contact(targetUser);
				await utils.requesterCollection
					.addContactWithCellphone(socket)
					.emitFull(addingContact);

				const {
					data: { contacts },
				} = await utils.requesterCollection.getContacts(socket).emitFull();

				assertionInitializerHelper().oneContact({
					testValue: contacts.at(0)!,
					equalValue: addingContact,
				});
			}
		);
	}
);
