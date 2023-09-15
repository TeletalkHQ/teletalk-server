import { assertion } from "@/classes/Assertion";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.e2eSuccessDescribe("addBlock", "event"),
	() => {
		it(
			utils.createTestMessage.e2eSuccessTest(
				"addBlock",
				"event",
				"should add users to blacklist"
			),
			async () => {
				const { socket } = await randomMaker.user();
				const { user: targetUser } = await randomMaker.user();

				const {
					data: { blockedUser },
				} = await utils.requesterCollection.addBlock(socket).emitFull({
					userId: targetUser.userId,
				});

				assertion().userId({
					testValue: blockedUser.userId,
					equalValue: targetUser.userId,
				});
			}
		);
	}
);
