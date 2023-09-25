import { assertion } from "@/classes/Assertion";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.e2eSuccessDescribe("removeBlock", "event"),
	() => {
		it(
			utils.createTestMessage.e2eSuccessTest(
				"removeBlock",
				"event",
				"should remove user from blacklist"
			),
			async () => {
				const { socket } = await randomMaker.e2eUser();
				const { user: targetUser } = await randomMaker.e2eUser();

				await utils.requesterCollection
					.addBlock(socket)
					.emitFull({ userId: targetUser.userId });

				const {
					data: { removedBlock },
				} = await utils.requesterCollection.removeBlock(socket).emitFull({
					userId: targetUser.userId,
				});

				assertion().userId({
					testValue: removedBlock.userId,
					equalValue: targetUser.userId,
				});
			}
		);
	}
);
