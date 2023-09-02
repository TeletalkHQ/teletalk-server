import { UserData } from "utility-store/lib/types";

import { extractor } from "~/classes/Extractor";
import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.unitSuccessDescribe("updatePublicData", "service"),
	() => {
		it(
			utils.createTestMessage.unitSuccessTest(
				"updatePublicData",
				"service",
				"should update user public data"
			),
			async () => {
				const { user: currentUser } = await randomMaker.user();

				const length = 10;
				const usersPublicData = randomMaker.usersPublicData(
					length,
					currentUser.userId
				);

				for (const publicData of usersPublicData) {
					await services.user.updatePublicData({
						currentUserId: currentUser.userId,
						updateProperties: publicData,
					});

					const user = (await services.user.findByUserId({
						currentUserId: currentUser.userId,
					})) as UserData;

					assertionInitializerHelper().userPublicData({
						testValue: extractor.userPublicData(user),
						equalValue: publicData,
					});
				}
			}
		);
	}
);

describe(
	utils.createTestMessage.unitFailDescribe("updatePublicData", "service"),
	() => {
		it(
			utils.createTestMessage.unitFailTest(
				"updatePublicData",
				"service",
				"CURRENT_USER_NOT_EXIST"
			),
			async () => {
				await utils.expectToFail_async(async () => {
					await services.user.updatePublicData({
						currentUserId: randomMaker.userId(),
						updateProperties: randomMaker.userPublicData(),
					});
				}, "CURRENT_USER_NOT_EXIST");
			}
		);
	}
);
