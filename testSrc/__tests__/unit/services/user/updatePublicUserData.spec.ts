import { UserData } from "utility-store/lib/types";

import { extractor } from "~/classes/Extractor";
import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(`${services.updateUserPublicData.name} success tests`, () => {
	it("should update user public data", async () => {
		const { user: currentUser } = await randomMaker.user();

		const length = 10;
		const usersPublicData = randomMaker.usersPublicData(
			length,
			currentUser.userId
		);

		for (const publicData of usersPublicData) {
			await services.updateUserPublicData({
				currentUserId: currentUser.userId,
				updateProperties: publicData,
			});

			const user = (await services.findOneUser({
				userId: currentUser.userId,
			})) as UserData;

			assertionInitializerHelper().userPublicData({
				testValue: extractor.userPublicData(user),
				equalValue: publicData,
			});
		}
	});
});

describe(`${services.updateUserPublicData.name} fail tests`, () => {
	it(utils.createUnitFailTestMessage("CURRENT_USER_NOT_EXIST"), async () => {
		await utils.expectToFail_async(async () => {
			await services.updateUserPublicData({
				currentUserId: randomMaker.userId(),
				updateProperties: randomMaker.userPublicData(),
			});
		}, "CURRENT_USER_NOT_EXIST");
	});
});
