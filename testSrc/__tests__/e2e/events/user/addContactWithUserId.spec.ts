import { FullNameWithUserId } from "utility-store/lib/types";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.e2eSuccessDescribe("addContactWithUserId", "event"),
	() => {
		it(
			utils.createTestMessage.e2eSuccessTest(
				"addContactWithUserId",
				"event",
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
					data: { newContact },
				} = await utils.requesterCollection
					.addContactWithUserId(socket)
					.sendFullFeaturedRequest(sendingData);

				assertionInitializerHelper().oneContactWithUserId({
					testValue: newContact,
					equalValue: sendingData,
				});
			}
		);
	}
);
