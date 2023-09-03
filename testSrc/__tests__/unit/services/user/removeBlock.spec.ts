import { BlackList, UserData } from "utility-store/lib/types";

import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
	utils.createTestMessage.unitSuccessDescribe("removeBlock", "service"),
	() => {
		it(
			utils.createTestMessage.unitSuccessTest(
				"removeBlock",
				"service",
				"should remove user from blacklist"
			),
			async () => {
				const { user: currentUser } = await randomMaker.user();

				const blockingUsers: BlackList = [];

				const length = 10;
				const users = await Promise.all(randomMaker.batchUsers(length));

				for (const { user: targetUser } of users) {
					await services.user.addBlock({
						currentUserId: currentUser.userId,
						targetUserId: targetUser.userId,
					});

					blockingUsers.push({
						userId: targetUser.userId,
					});
				}

				for (const { user: targetUser } of [...users]) {
					await services.user.removeBlock({
						targetUserId: targetUser.userId,
						currentUserId: currentUser.userId,
					});

					blockingUsers.shift();

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

await utils.generateServiceFailTest("removeBlock", "CURRENT_USER_NOT_EXIST", {
	currentUserId: randomMaker.userId(),
	targetUserId: randomMaker.userId(),
});

await utils.generateServiceFailTest(
	"removeBlock",
	"BLACKLIST_ITEM_NOT_EXIST",
	async () => {
		const { user: currentUser } = await randomMaker.user();

		return {
			currentUserId: currentUser.userId,
			targetUserId: randomMaker.userId(),
		};
	}
);
