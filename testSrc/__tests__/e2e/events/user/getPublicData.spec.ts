import { extractor } from "~/classes/Extractor";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.e2eSuccessDescribe("getPublicData", "event"),
	() => {
		it(
			utils.createTestMessage.e2eSuccessTest(
				"getPublicData",
				"event",
				"should get current user public data"
			),
			async () => {
				const { socket, user: currentUser } = await randomMaker.user();

				const {
					data: { publicData },
				} = await utils.requesterCollection
					.getPublicData(socket)
					.sendFullFeaturedRequest({
						userId: currentUser.userId,
					});

				assertionInitializerHelper().userPublicData({
					testValue: publicData,
					equalValue: extractor.userPublicData(currentUser),
				});
			}
		);

		it(
			utils.createTestMessage.e2eSuccessTest(
				"getPublicData",
				"event",
				"should get target user public data"
			),
			async () => {
				const { socket } = await randomMaker.user();
				const { user: targetUser } = await randomMaker.user();

				const {
					data: { publicData },
				} = await utils.requesterCollection
					.getPublicData(socket)
					.sendFullFeaturedRequest({
						userId: targetUser.userId,
					});

				assertionInitializerHelper().userPublicData({
					testValue: publicData,
					equalValue: extractor.userPublicData(targetUser),
				});
			}
		);
	}
);
