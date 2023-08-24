import chai from "chai";
import { UserData } from "utility-store/lib/types";

import { services } from "~/services";
import { UserId } from "~/types/datatypes";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";
import { FIELD_TYPE } from "@/variables";

describe("addBlock successful tests", () => {
	it("should add users to blacklist", async () => {
		const { socket, user } = await randomMaker.user();
		const requester = utils.requesterCollection.addBlock(socket);

		const blacklistLength = 10;
		for (let i = 0; i < blacklistLength; i++) {
			const { user: targetUser } = await randomMaker.user();

			const {
				data: { blockedUser },
			} = await requester.sendFullFeaturedRequest({
				userId: targetUser.userId,
			});

			await testAddBlockResponse({
				blockedUserId: blockedUser.userId,
				currentUser: user,
				targetUser,
			});
		}

		const { blacklist } = (await services.findOneUser({
			userId: user.userId,
		}))!;

		chai.expect(blacklist).to.be.an(FIELD_TYPE.ARRAY);
		chai.expect(blacklist.length).to.be.equal(blacklistLength);
	});
});

await utils.asyncDescribe("addBlock fail tests", async () => {
	const { user: currentUser, requester } = await utils.setupRequester(
		utils.requesterCollection.addBlock
	);

	const selfStuffData = {
		userId: currentUser.userId,
	};

	const targetUserSignData = randomMaker.unusedCellphone();
	const { user: targetUser } = await randomMaker.user(targetUserSignData);
	const blockedUserData = {
		userId: targetUser.userId,
	};

	await requester.sendFullFeaturedRequest({ userId: targetUser.userId });

	return () => {
		const random = { userId: randomMaker.userId() };

		e2eFailTestInitializerHelper(requester)
			.input(random)
			.selfStuff(selfStuffData)
			.userId(random)
			.targetUserNotExist(random)
			.blacklistItemExist(blockedUserData);
	};
});

const testAddBlockResponse = async (data: {
	blockedUserId: UserId;
	currentUser: UserData;
	targetUser: UserData;
}) => {
	await testTargetUserBlacklist(data.targetUser.userId);
	const savedBlockItem = await findSavedBlacklist(
		data.currentUser.userId,
		data.targetUser.userId
	);
	testBlockItem(savedBlockItem.userId, data.blockedUserId);
	testBlockItem(data.targetUser.userId, data.blockedUserId);
};

const testTargetUserBlacklist = async (targetUserId: UserId) => {
	const blacklist = await findBlacklist(targetUserId);
	chai.expect(blacklist).to.be.an(FIELD_TYPE.ARRAY);
	chai.expect(blacklist.length).to.be.equal(0);

	return blacklist;
};

const findSavedBlacklist = async (
	currentUserId: UserId,
	targetUserId: UserId
) => {
	const blacklist = await findBlacklist(currentUserId);
	return blacklist.find((i) => i.userId === targetUserId)!;
};

const findBlacklist = async (userId: UserId) => {
	const { blacklist } = (await services.findOneUser({
		userId,
	})) as UserData;
	return blacklist;
};

const testBlockItem = (testValue: string, equalValue: string) => {
	assertionInitializerHelper().userId({
		equalValue,
		testValue,
	});
};
