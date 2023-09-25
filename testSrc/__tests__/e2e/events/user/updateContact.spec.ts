import { FullNameWithUserId } from "teletalk-type-store";

import { extractor } from "~/classes/Extractor";

import { assertion } from "@/classes/Assertion";
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
				const { socket } = await randomMaker.e2eUser();
				const { user: targetUser } = await randomMaker.e2eUser();

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

				assertion().oneContactWithUserId({
					testValue: updatedContact,
					equalValue: editingContactData,
				});
			}
		);
	}
);
