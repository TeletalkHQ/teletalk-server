import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(utils.createTestMessage.e2eSuccessDescribe("addBlock"), () => {
	it(
		utils.createTestMessage.e2eSuccessTest(
			"addBlock",
			"should add users to blacklist"
		),
		async () => {
			const { socket } = await randomMaker.user();
			const { user: targetUser } = await randomMaker.user();

			const {
				data: { blockedUser },
			} = await utils.requesterCollection
				.addBlock(socket)
				.sendFullFeaturedRequest({
					userId: targetUser.userId,
				});

			assertionInitializerHelper().userId({
				testValue: blockedUser.userId,
				equalValue: targetUser.userId,
			});
		}
	);
});

await utils.asyncDescribe(
	utils.createTestMessage.e2eFailDescribe("addBlock"),
	async () => {
		const { user: currentUser, requester } = await utils.setupRequester(
			utils.requesterCollection.addBlock
		);

		const selfStuffData = {
			userId: currentUser.userId,
		};

		return () => {
			const random = { userId: randomMaker.userId() };

			e2eFailTestInitializerHelper(requester)
				.input(random)
				.selfStuff(selfStuffData)
				.userId(random);
		};
	}
);
