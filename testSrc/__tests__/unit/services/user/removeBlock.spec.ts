import { BlackList, UserData } from "utility-store/lib/types";

import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(`${services.removeBlock.name} success tests`, () => {
	it(
		utils.createTestMessage.unitSuccessTest(
			"removeBlock",
			"should remove user from blacklist"
		),
		async () => {
			const { user: currentUser } = await randomMaker.user();

			const blockingUsers: BlackList = [];

			const length = 10;
			const users = await Promise.all(randomMaker.batchUsers(length));

			for (const { user: targetUser } of users) {
				await services.addBlock({
					currentUserId: currentUser.userId,
					targetUserId: targetUser.userId,
				});

				blockingUsers.push({
					userId: targetUser.userId,
				});
			}

			for (const { user: targetUser } of [...users]) {
				await services.removeBlock({
					targetUserId: targetUser.userId,
					currentUserId: currentUser.userId,
				});

				blockingUsers.shift();

				const { blacklist } = (await services.findOneUser({
					userId: currentUser.userId,
				})) as UserData;

				assertionInitializerHelper().blacklist({
					testValue: blacklist,
					equalValue: blockingUsers,
				});
			}
		}
	);
});

describe(`${services.removeBlock.name} fail tests`, () => {
	it(
		utils.createTestMessage.unitFailTest(
			"removeBlock",
			"BLACKLIST_ITEM_NOT_EXIST"
		),
		async () => {
			const { user: currentUser } = await randomMaker.user();
			const { user: targetUser } = await randomMaker.user();

			await utils.expectToFail_async(async () => {
				await services.removeBlock({
					currentUserId: currentUser.userId,
					targetUserId: targetUser.userId,
				});
			}, "BLACKLIST_ITEM_NOT_EXIST");
		}
	);

	it(
		utils.createTestMessage.unitFailTest(
			"removeBlock",
			"CURRENT_USER_NOT_EXIST"
		),
		async () => {
			await utils.expectToFail_async(async () => {
				await services.removeBlock({
					currentUserId: randomMaker.userId(),
					targetUserId: randomMaker.userId(),
				});
			}, "CURRENT_USER_NOT_EXIST");
		}
	);
});
