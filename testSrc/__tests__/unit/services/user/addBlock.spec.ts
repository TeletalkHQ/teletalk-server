import { BlackList, UserData } from "utility-store/lib/types";

import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.unitSuccessDescribe("addBlock", "service"),
	() => {
		it(
			utils.createTestMessage.unitSuccessTest(
				"addBlock",
				"service",
				"should add new blacklist item with target user id"
			),
			async () => {
				const { user: currentUser } = await randomMaker.user();

				const blockingUsers: BlackList = [];

				const length = 1;
				const users = await Promise.all(randomMaker.batchUsers(length));

				for (const { user: targetUser } of users) {
					await services.user.addBlock({
						targetUserId: targetUser.userId,
						currentUserId: currentUser.userId,
					});

					blockingUsers.push({ userId: targetUser.userId });

					const { blacklist } = (await services.user.findByUserId({
						currentUserId: currentUser.userId,
					})) as UserData;

					assertionInitializerHelper().blacklist({
						testValue: blacklist,
						equalValue: blockingUsers,
					});
				}
			}
		);
	}
);

describe(
	utils.createTestMessage.unitFailDescribe("addBlock", "service"),
	() => {
		it(
			utils.createTestMessage.unitFailTest(
				"addBlock",
				"service",
				"BLACKLIST_ITEM_EXIST"
			),
			async () => {
				const { user: currentUser } = await randomMaker.user();
				const { user: targetUser } = await randomMaker.user();

				await services.user.addBlock({
					currentUserId: currentUser.userId,
					targetUserId: targetUser.userId,
				});

				await utils.expectToFail_async(async () => {
					await services.user.addBlock({
						currentUserId: currentUser.userId,
						targetUserId: targetUser.userId,
					});
				}, "BLACKLIST_ITEM_EXIST");
			}
		);

		it(
			utils.createTestMessage.unitFailTest(
				"addBlock",
				"service",
				"TARGET_USER_NOT_EXIST"
			),
			async () => {
				const { user: currentUser } = await randomMaker.user();

				await utils.expectToFail_async(async () => {
					await services.user.addBlock({
						currentUserId: currentUser.userId,
						targetUserId: randomMaker.userId(),
					});
				}, "TARGET_USER_NOT_EXIST");
			}
		);

		it(
			utils.createTestMessage.unitFailTest(
				"addBlock",
				"service",
				"CURRENT_USER_NOT_EXIST"
			),
			async () => {
				await utils.expectToFail_async(async () => {
					await services.user.addBlock({
						currentUserId: randomMaker.userId(),
						targetUserId: randomMaker.userId(),
					});
				}, "CURRENT_USER_NOT_EXIST");
			}
		);
	}
);
