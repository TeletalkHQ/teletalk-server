import { extractor } from "~/classes/Extractor";
import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(`${services.getUserPublicData.name} success tests`, () => {
	it(
		utils.createTestMessage.unitSuccessTest(
			"getUserPublicData",
			"should add new blacklist item with target user id"
		),
		async () => {
			const { user: currentUser } = await randomMaker.user();

			const { userPublicData } = await services.getUserPublicData({
				userId: currentUser.userId,
			});

			assertionInitializerHelper().userPublicData({
				testValue: userPublicData,
				equalValue: extractor.userPublicData(currentUser),
			});
		}
	);
});

describe(`${services.getUserPublicData.name} fail tests`, () => {
	it(
		utils.createTestMessage.unitFailTest(
			"getUserPublicData",
			"TARGET_USER_NOT_EXIST"
		),
		async () => {
			await utils.expectToFail_async(async () => {
				await services.getUserPublicData({
					userId: randomMaker.userId(),
				});
			}, "TARGET_USER_NOT_EXIST");
		}
	);
});
