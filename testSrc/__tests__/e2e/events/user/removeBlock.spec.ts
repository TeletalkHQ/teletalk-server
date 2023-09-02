import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
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
				const { socket } = await randomMaker.user();
				const { user: targetUser } = await randomMaker.user();

				await utils.requesterCollection
					.addBlock(socket)
					.sendFullFeaturedRequest({ userId: targetUser.userId });

				const {
					data: { removedBlock },
				} = await utils.requesterCollection
					.removeBlock(socket)
					.sendFullFeaturedRequest({
						userId: targetUser.userId,
					});

				assertionInitializerHelper().userId({
					testValue: removedBlock.userId,
					equalValue: targetUser.userId,
				});
			}
		);
	}
);

await utils.asyncDescribe(
	utils.createTestMessage.e2eFailDescribe("removeBlock", "event"),
	async () => {
		const { requester, user } = await utils.setupRequester(
			utils.requesterCollection.removeBlock
		);

		return () => {
			const selfStuffData = {
				userId: user.userId,
			};

			const random = {
				userId: randomMaker.userId(),
			};

			e2eFailTestInitializerHelper(requester)
				.input(random)
				.selfStuff(selfStuffData)
				.userId(random);
		};
	}
);
