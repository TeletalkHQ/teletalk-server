import { extractor } from "~/classes/Extractor";
import { services } from "~/services";
import { UserPublicData } from "~/types/datatypes";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe("updateUserPublicData success tests", () => {
	it("should get user public data", async () => {
		const users = await randomMaker.users(10);

		for (const { socket, user } of users) {
			const data = randomMaker.userPublicData();

			const requester = utils.requesterCollection.updateUserPublicData(socket);
			const {
				data: { userPublicData: publicDataFromEvent },
			} = await requester.sendFullFeaturedRequest(data);

			const equalValue = { ...data, userId: user.userId };

			testUserPublicData(equalValue, publicDataFromEvent);

			const targetUserDataInDb = (await services.findOneUser({
				userId: user.userId,
			}))!;

			const publicDataFromDb = extractor.userPublicData(targetUserDataInDb);
			testUserPublicData(equalValue, publicDataFromDb);
		}
	});
});

await utils.asyncDescribe("updateUserPublicData fail tests", async () => {
	const { requester } = await utils.setupRequester(
		utils.requesterCollection.updateUserPublicData
	);

	return () => {
		const publicDataForUpdate = randomMaker.userPublicData();

		e2eFailTestInitializerHelper(requester)
			.input(publicDataForUpdate)
			.bio(publicDataForUpdate)
			.firstName(publicDataForUpdate)
			.lastName(publicDataForUpdate)
			.username(publicDataForUpdate);
	};
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
