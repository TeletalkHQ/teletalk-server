import { extractor } from "~/classes/Extractor";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.e2eSuccessDescribe("getUserData", "event"),
	() => {
		it(
			utils.createTestMessage.e2eSuccessTest(
				"getUserData",
				"event",
				"should get currentUser data"
			),
			async () => {
				const { socket, user } = await randomMaker.user();

				const {
					data: { user: receivedUserData },
				} = await utils.requesterCollection
					.getUserData(socket)
					.sendFullFeaturedRequest();

				assertionInitializerHelper().userData({
					equalValue: extractor.userData(user),
					testValue: receivedUserData,
				});
			}
		);
	}
);
