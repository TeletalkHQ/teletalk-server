import { FullNameWithUserId } from "teletalk-type-store";

import { assertion } from "@/classes/Assertion";
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
				const { socket } = await randomMaker.e2eUser();
				const { user: targetUser } = await randomMaker.e2eUser();

				const sendingData: FullNameWithUserId = {
					...randomMaker.fullName(),
					userId: targetUser.userId,
				};

				const {
					data: { newContact },
				} = await utils.requesterCollection
					.addContactWithUserId(socket)
					.emitFull(sendingData);

				assertion().oneContactWithUserId({
					testValue: newContact,
					equalValue: sendingData,
				});
			}
		);
	}
);
