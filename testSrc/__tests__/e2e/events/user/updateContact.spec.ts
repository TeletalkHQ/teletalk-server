import { FullNameWithUserId } from "utility-store/lib/types";

import { extractor } from "~/classes/Extractor";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.e2eSuccessDescribe("updateContact", "event"),
	() => {
		it(
			utils.createTestMessage.e2eSuccessTest(
				"updateContact",
				"event",
				"should edit users in contacts"
			),
			async () => {
				const { socket } = await randomMaker.user();
				const { user: targetUser } = await randomMaker.user();

				const addingContactData = extractor.contactWithUserId(targetUser);

				await utils.requesterCollection
					.addContactWithUserId(socket)
					.emitFull(addingContactData);

				const editingContactData: FullNameWithUserId = {
					...randomMaker.fullName(),
					userId: addingContactData.userId,
				};

				const {
					data: { updatedContact },
				} = await utils.requesterCollection
					.updateContact(socket)
					.emitFull(editingContactData);

				assertionInitializerHelper().oneContactWithUserId({
					testValue: updatedContact,
					equalValue: editingContactData,
				});
			}
		);
	}
);
