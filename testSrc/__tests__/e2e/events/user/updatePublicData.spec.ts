import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.e2eSuccessDescribe("updatePublicData", "event"),
	() => {
		it(
			utils.createTestMessage.e2eSuccessTest(
				"updatePublicData",
				"event",
				"should get user public data"
			),
			async () => {
				const { socket, user: currentUser } = await randomMaker.user();

				const { userId, ...sendingData } = randomMaker.userPublicData();

				const {
					data: { userPublicData: receivedData },
				} = await utils.requesterCollection
					.updatePublicData(socket)
					.sendFullFeaturedRequest(sendingData);

				assertionInitializerHelper().userPublicData({
					equalValue: { ...sendingData, userId: currentUser.userId },
					testValue: receivedData,
				});
			}
		);
	}
);
