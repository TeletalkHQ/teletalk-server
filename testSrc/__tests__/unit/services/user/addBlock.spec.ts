import chai from "chai";
import { BlackList, UserData } from "utility-store/lib/types";

import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(`${services.addBlock.name} success tests`, () => {
	it("should add new blacklist item with target user id", async () => {
		const { user: currentUser } = await randomMaker.user();

		const blockingUsers: BlackList = [];

		const length = 10;
		const users = await Promise.all(randomMaker.batchUsers(length));

		for (const { user: targetUser } of users) {
			await services.addBlock({
				blockingUserId: targetUser.userId,
				currentUserId: currentUser.userId,
			});

			blockingUsers.push({ userId: targetUser.userId });

			const { blacklist } = (await services.findOneUser({
				userId: currentUser.userId,
			})) as UserData;

			chai.expect(blacklist.length).to.be.equal(blockingUsers.length);

			assertionInitializerHelper().blacklist({
				testValue: blacklist,
				equalValue: blockingUsers,
			});
		}
	});
});

describe(`${services.addBlock.name} fail tests`, () => {
	it(utils.createUnitFailTestMessage("BLACKLIST_ITEM_EXIST"), async () => {
		const { user: currentUser } = await randomMaker.user();
		const { user: targetUser } = await randomMaker.user();

		await services.addBlock({
			currentUserId: currentUser.userId,
			blockingUserId: targetUser.userId,
		});

		await utils.expectToFail_async(async () => {
			await services.addBlock({
				currentUserId: currentUser.userId,
				blockingUserId: targetUser.userId,
			});
		}, "BLACKLIST_ITEM_EXIST");
	});

	it(utils.createUnitFailTestMessage("TARGET_USER_NOT_EXIST"), async () => {
		const { user: currentUser } = await randomMaker.user();

		await utils.expectToFail_async(async () => {
			await services.addBlock({
				currentUserId: currentUser.userId,
				blockingUserId: randomMaker.userId(),
			});
		}, "TARGET_USER_NOT_EXIST");
	});

	it(utils.createUnitFailTestMessage("CURRENT_USER_NOT_EXIST"), async () => {
		await utils.expectToFail_async(async () => {
			await services.addBlock({
				currentUserId: randomMaker.userId(),
				blockingUserId: randomMaker.userId(),
			});
		}, "CURRENT_USER_NOT_EXIST");
	});
});
