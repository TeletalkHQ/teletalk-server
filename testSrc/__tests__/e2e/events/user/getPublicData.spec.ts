import { extractor } from "~/classes/Extractor";

import { assertion } from "@/classes/Assertion";
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
				const { socket, user: currentUser } = await randomMaker.e2eUser();

				const {
					data: { publicData },
				} = await utils.requesterCollection.getPublicData(socket).emitFull({
					userId: currentUser.userId,
				});

				assertion().userPublicData({
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
				const { socket } = await randomMaker.e2eUser();
				const { user: targetUser } = await randomMaker.e2eUser();

				const {
					data: { publicData },
				} = await utils.requesterCollection.getPublicData(socket).emitFull({
					userId: targetUser.userId,
				});

				assertion().userPublicData({
					testValue: publicData,
					equalValue: extractor.userPublicData(targetUser),
				});
			}
		);
	}
);
