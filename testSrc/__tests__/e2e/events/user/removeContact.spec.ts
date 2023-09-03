import { extractor } from "~/classes/Extractor";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.e2eSuccessDescribe("removeContact", "event"),
	() => {
		it(
			utils.createTestMessage.e2eSuccessTest(
				"removeContact",
				"event",
				"should remove users from contacts"
			),
			async () => {
				const { socket } = await randomMaker.user();
				const { user: targetUser } = await randomMaker.user();

				const addingContact = extractor.contactWithUserId(targetUser);

				await utils.requesterCollection
					.addContactWithUserId(socket)
					.sendFullFeaturedRequest(addingContact);

				const {
					data: { removedContact },
				} = await utils.requesterCollection
					.removeContact(socket)
					.sendFullFeaturedRequest({
						userId: addingContact.userId,
					});

				assertionInitializerHelper().userId({
					equalValue: addingContact.userId,
					testValue: removedContact.userId,
				});
			}
		);
	}
);
