import { extractor } from "~/classes/Extractor";
import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
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
				const { user: currentUser } = await randomMaker.user();

				const { userPublicData } = await services.user.getPublicData({
					targetUserId: currentUser.userId,
				});

				assertionInitializerHelper().userPublicData({
					testValue: userPublicData,
					equalValue: extractor.userPublicData(currentUser),
				});
			}
		);
	}
);

describe(
	utils.createTestMessage.unitFailDescribe("getPublicData", "service"),
	() => {
		it(
			utils.createTestMessage.unitFailTest(
				"getPublicData",
				"service",
				"TARGET_USER_NOT_EXIST"
			),
			async () => {
				await utils.expectToFail_async(async () => {
					await services.user.getPublicData({
						targetUserId: randomMaker.userId(),
					});
				}, "TARGET_USER_NOT_EXIST");
			}
		);
	}
);
