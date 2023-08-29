import { FullNameWithUserId } from "utility-store/lib/types";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.e2eSuccessDescribe("addContactWithUserId"),
	() => {
		it(
			utils.createTestMessage.e2eSuccessTest(
				"addContactWithUserId",
				"should add users to contacts"
			),
			async () => {
				const { socket } = await randomMaker.user();
				const { user: targetUser } = await randomMaker.user();

				const sendingData: FullNameWithUserId = {
					...randomMaker.fullName(),
					userId: targetUser.userId,
				};

				const {
					data: { addedContact },
				} = await utils.requesterCollection
					.addContactWithUserId(socket)
					.sendFullFeaturedRequest(sendingData);

				assertionInitializerHelper().oneContactWithUserId({
					testValue: addedContact,
					equalValue: sendingData,
				});
			}
		);
	}
);

await utils.asyncDescribe(
	utils.createTestMessage.e2eFailDescribe("addContactWithUserId"),
	async () => {
		const currentUserCellphone = randomMaker.unusedCellphone();

		const { requester, user: currentUser } = await utils.setupRequester(
			utils.requesterCollection.addContactWithUserId,
			currentUserCellphone
		);

		return () => {
			const contactItemWithUserId: FullNameWithUserId = {
				...randomMaker.fullName(),
				userId: randomMaker.userId(),
			};

			const selfStuffData: FullNameWithUserId = {
				...randomMaker.fullName(),
				userId: currentUser.userId,
			};

			e2eFailTestInitializerHelper(requester)
				.input(contactItemWithUserId)
				.firstName(contactItemWithUserId)
				.lastName(contactItemWithUserId)
				.userId(contactItemWithUserId)
				.selfStuff(selfStuffData);
		};
	}
);
