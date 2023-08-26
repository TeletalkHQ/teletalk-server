import { services } from "~/services";
import { UserPublicData } from "~/types/datatypes";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe("getUserData success tests", () => {
	it("should get currentUser data", async () => {
		const { socket } = await randomMaker.user();
		const requester = utils.requesterCollection.getUserPublicData(socket);

		const users = await randomMaker.users(10);

		for (const { user: targetUserData } of users) {
			const {
				data: { userPublicData },
			} = await requester.sendFullFeaturedRequest({
				userId: targetUserData.userId,
			});

			const targetUserDataInDb = (await services.findOneUser({
				userId: targetUserData.userId,
			}))!;

			testUserPublicData(targetUserDataInDb, userPublicData);
			testUserPublicData(targetUserData, userPublicData);
		}
	});
});

const testUserPublicData = (
	equalValue: UserPublicData,
	testValue: UserPublicData
) => {
	assertionInitializerHelper()
		.firstName({
			equalValue: equalValue.firstName,
			testValue: testValue.firstName,
		})
		.lastName({
			equalValue: equalValue.lastName,
			testValue: testValue.lastName,
		})
		.bio({
			equalValue: equalValue.bio,
			testValue: testValue.bio,
		})
		.username({
			equalValue: equalValue.username,
			testValue: testValue.username,
		})
		.userId({
			equalValue: equalValue.userId,
			testValue: testValue.userId,
		});
};

await utils.asyncDescribe("getUserPublicData fail tests", async () => {
	const { requester } = await utils.setupRequester(
		utils.requesterCollection.getUserPublicData
	);

	return () => {
		const data = {
			userId: randomMaker.userId(),
		};

		e2eFailTestInitializerHelper(requester).input(data).userId(data);
	};
});
