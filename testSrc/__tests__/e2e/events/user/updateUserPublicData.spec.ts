import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.e2eSuccessDescribe("updateUserPublicData"),
	() => {
		it(
			utils.createTestMessage.e2eSuccessTest(
				"updateUserPublicData",
				"should get user public data"
			),
			async () => {
				const { socket, user: currentUser } = await randomMaker.user();

				const { userId, ...sendingData } = randomMaker.userPublicData();

				const {
					data: { userPublicData: receivedData },
				} = await utils.requesterCollection
					.updateUserPublicData(socket)
					.sendFullFeaturedRequest(sendingData);

				assertionInitializerHelper().userPublicData({
					equalValue: { ...sendingData, userId: currentUser.userId },
					testValue: receivedData,
				});
			}
		);
	}
);

await utils.asyncDescribe(
	utils.createTestMessage.e2eFailDescribe("updateUserPublicData"),
	async () => {
		const { requester } = await utils.setupRequester(
			utils.requesterCollection.updateUserPublicData
		);

		return () => {
			const data = randomMaker.userPublicData();

			e2eFailTestInitializerHelper(requester)
				.input(data)
				.bio(data)
				.firstName(data)
				.lastName(data)
				.username(data);
		};
	}
);
