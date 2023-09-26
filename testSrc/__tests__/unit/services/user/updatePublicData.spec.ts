import { DBUserData } from "teletalk-type-store";

import { extractor } from "~/classes/Extractor";
import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
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
				const { user: currentUser, sessionId } =
					await randomMaker.serviceUser();

				const length = 10;
				const usersPublicData = randomMaker.usersPublicData(
					length,
					currentUser.userId
				);

				for (const publicData of usersPublicData) {
					await services.user.updatePublicData({
						currentSessionId: sessionId,
						updateProperties: publicData,
					});

					const user = (await services.user.findByUserId({
						targetUserId: currentUser.userId,
					})) as DBUserData;

					assertion().userPublicData({
						testValue: extractor.userPublicData(user),
						equalValue: publicData,
					});
				}
			}
		);
	}
);

await utils.generateServiceFailTest(
	"updatePublicData",
	"CURRENT_USER_NOT_EXIST",
	{
		currentSessionId: randomMaker.sessionId(),
		updateProperties: randomMaker.userPublicData(),
	}
);
