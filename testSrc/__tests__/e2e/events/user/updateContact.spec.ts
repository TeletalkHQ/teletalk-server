import { FullNameWithUserId } from "utility-store/lib/types";

import { extractor } from "~/classes/Extractor";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
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
					.sendFullFeaturedRequest(addingContactData);

				const editingContactData: FullNameWithUserId = {
					...randomMaker.fullName(),
					userId: addingContactData.userId,
				};

				const {
					data: { editedContact },
				} = await utils.requesterCollection
					.updateContact(socket)
					.sendFullFeaturedRequest(editingContactData);

				assertionInitializerHelper().oneContactWithUserId({
					testValue: editedContact,
					equalValue: editingContactData,
				});
			}
		);
	}
);

await utils.asyncDescribe(
	utils.createTestMessage.e2eFailDescribe("updateContact", "event"),
	async () => {
		const { requester, user } = await utils.setupRequester(
			utils.requesterCollection.updateContact
		);

		return () => {
			const data = {
				...randomMaker.fullName(),
				userId: randomMaker.userId(),
			};

			const selfStuffData = {
				...randomMaker.fullName(),
				userId: user.userId,
			};

			e2eFailTestInitializerHelper(requester)
				.input(data)
				.firstName(data)
				.lastName(data)
				.userId(data)
				.selfStuff(selfStuffData);
		};
	}
);
