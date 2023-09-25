import { extractor } from "~/classes/Extractor";
import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.unitSuccessDescribe("getPublicData", "service"),
	() => {
		it(
			utils.createTestMessage.unitSuccessTest(
				"getPublicData",
				"service",
				"should add new blacklist item with target user id"
			),
			async () => {
				const { user: currentUser } = await randomMaker.serviceUser();

				const { publicData } = await services.user.getPublicData({
					targetUserId: currentUser.userId,
				});

				assertion().userPublicData({
					testValue: publicData,
					equalValue: extractor.userPublicData(currentUser),
				});
			}
		);
	}
);

await utils.generateServiceFailTest("getPublicData", "TARGET_USER_NOT_EXIST", {
	targetUserId: randomMaker.userId(),
});
