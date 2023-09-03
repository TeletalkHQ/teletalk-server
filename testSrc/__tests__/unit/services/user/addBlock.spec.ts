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

await utils.generateServiceFailTest("addBlock", "CURRENT_USER_NOT_EXIST", {
	currentUserId: randomMaker.userId(),
	targetUserId: randomMaker.userId(),
});

await utils.generateServiceFailTest(
	"addBlock",
	"TARGET_USER_NOT_EXIST",
	async () => {
		const { user: currentUser } = await randomMaker.user();

		return {
			currentUserId: currentUser.userId,
			targetUserId: randomMaker.userId(),
		};
	}
);

await utils.generateServiceFailTest(
	"addBlock",
	"BLACKLIST_ITEM_EXIST",
	async () => {
		const { user: currentUser } = await randomMaker.user();
		const { user: targetUser } = await randomMaker.user();

		await services.user.addBlock({
			currentUserId: currentUser.userId,
			targetUserId: targetUser.userId,
		});

		return {
			currentUserId: currentUser.userId,
			targetUserId: targetUser.userId,
		};
	}
);
