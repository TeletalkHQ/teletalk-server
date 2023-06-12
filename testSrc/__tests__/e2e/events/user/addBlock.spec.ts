import { assertionInitializerHelper } from "$/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "$/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "$/classes/RandomMaker";

import { helpers } from "$/helpers";

import { services } from "~/services";

import { BlackListItem, UserMongo } from "~/types";

import { customTypeof } from "custom-typeof";

describe("addBlock successful tests", () => {
  it("should add users to blacklist", async () => {
    const { socket, user } = await randomMaker.user();
    const requester = helpers.requesterCollection.addBlock(socket);

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

    const { blacklist } = (await services.findOneUserById(
      user.userId
    )) as UserMongo;

    expect(customTypeof.isArray(blacklist)).toBeTruthy();
    expect(blacklist.length).toEqual(blacklistLength);
  });
});

await helpers.asyncDescribe("addBlock fail tests", async () => {
  const { user: currentUser, requester } = await helpers.setupRequester(
    helpers.requesterCollection.addBlock
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
  blockedUserId: string;
  currentUser: UserMongo;
  targetUser: UserMongo;
}) => {
  await testTargetUserBlacklist(data.targetUser.userId);
  const savedBlockItem = await findSavedBlacklist(
    data.currentUser.userId,
    data.targetUser.userId
  );
  testBlockItem(savedBlockItem.userId, data.blockedUserId);
  testBlockItem(data.targetUser.userId, data.blockedUserId);
};

const testTargetUserBlacklist = async (targetUserId: string) => {
  const blacklist = await findBlacklist(targetUserId);
  expect(customTypeof.isArray(blacklist)).toBeTruthy();
  expect(blacklist).toHaveLength(0);

  return blacklist;
};

const findSavedBlacklist = async (
  currentUserId: string,
  targetUserId: string
) => {
  const blacklist = await findBlacklist(currentUserId);
  return blacklist.find((i) => i.userId === targetUserId) as BlackListItem;
};

const findBlacklist = async (userId: string) => {
  const { blacklist } = (await services.findOneUserById(userId)) as UserMongo;
  return blacklist;
};

const testBlockItem = (testValue: string, equalValue: string) => {
  assertionInitializerHelper().userId({
    equalValue,
    testValue,
  });
};
