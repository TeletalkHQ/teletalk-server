import { expect } from "chai";

import { randomMaker } from "$/classes/RandomMaker";
import { socketHelper } from "$/classes/SocketHelper";

import { testHelper } from "$/helpers/testHelper";

import { services } from "@/services";

import { BlackListItem, UserMongo } from "@/types";

import { utilities } from "$/utilities";

import { FIELD_TYPE } from "$/variables/fieldType";

describe("addBlock successful tests", () => {
  it("should add users to blacklist", async () => {
    const { socket, user } = await randomMaker.user();
    const requester = utilities.requesters.addBlock(socket);

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

    expect(blacklist).to.be.an(FIELD_TYPE.ARRAY);
    expect(blacklist.length).to.be.equal(blacklistLength);
  });
});

describe("addBlock fail tests", () => {
  const clientSocket = socketHelper.createClient();
  const requester = utilities.requesters.addBlock(clientSocket);

  const currentUserSignData = randomMaker.unusedCellphone();
  const targetUserSignData = randomMaker.unusedCellphone();

  before(async () => {
    const { socket, user: currentUser } = await randomMaker.user(
      currentUserSignData
    );
    requester.setSocket(socket);
    data.selfStuffData.userId = currentUser.userId;

    const { user: targetUser } = await randomMaker.user(targetUserSignData);
    data.blockedUser.userId = targetUser.userId;

    await requester.sendFullFeaturedRequest({ userId: targetUser.userId });
  });

  const cellphone = randomMaker.unusedCellphone();

  const data = {
    blockedUser: {
      userId: "",
    },
    selfStuffData: {
      userId: "",
    },
  };

  const randomUserId = randomMaker.userId();

  testHelper
    .createFailTest(requester)
    .authentication()
    .input({ userId: randomUserId })
    .checkCurrentUserStatus(cellphone)
    .selfStuff(data.selfStuffData)
    .userId({ userId: randomUserId })
    .targetUserNotExist({ userId: randomUserId })
    .blacklistItemExist(data.blockedUser);
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
  expect(blacklist).to.be.an(FIELD_TYPE.ARRAY).and.to.be.empty;
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
  testHelper.createSuccessTest().userId({
    equalValue,
    testValue,
  });
};
