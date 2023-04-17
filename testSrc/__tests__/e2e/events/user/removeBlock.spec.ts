import { expect } from "chai";

import { assertionInitializerHelper } from "$/classes/AssertionInitializerHelper";
import { clientInitializer } from "$/classes/ClientInitializer";
import { e2eFailTestInitializerHelper } from "$/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "$/classes/RandomMaker";

import { services } from "@/services";

import { UserMongo } from "@/types";

import { utilities } from "$/utilities";

describe("removeContact successful test", () => {
  it("should add users to blacklist", async () => {
    const blacklistLength = 10;
    const userIds = await createUserIds(blacklistLength);

    const { user: currentUser, socket } = await randomMaker.user();

    const addBlockRequester = utilities.requesters.addBlock(socket);

    for (const userId of userIds) {
      await addBlockRequester.sendFullFeaturedRequest({ userId });
    }

    const removeBlockRequester = utilities.requesters.removeBlock(socket);

    for (const blacklistItem of [...userIds]) {
      const {
        data: { removedBlock },
      } = await removeBlockRequester.sendFullFeaturedRequest({
        userId: blacklistItem,
      });

      assertionInitializerHelper().userId({
        testValue: removedBlock.userId,
        equalValue: blacklistItem,
      });

      userIds.shift();
      await testBlacklistAfterRemoveOneItem(currentUser.userId, userIds);
    }

    await testBlacklistAfterRemoveAll(currentUser.userId);
  });
});

describe("removeBlock fail tests", () => {
  const clientSocket = clientInitializer.createClient();
  const requester = utilities.requesters.removeBlock(clientSocket);

  before(async () => {
    const { socket, user } = await randomMaker.user();
    requester.setSocket(socket);
    data.selfStuffData.userId = user.userId;
  });

  const data = {
    selfStuffData: {
      userId: "",
    },
  };

  const randomUserId = randomMaker.userId();

  e2eFailTestInitializerHelper(requester)
    .authentication()
    .input({ userId: randomUserId })
    // .checkCurrentUserStatus()
    .selfStuff(data.selfStuffData)
    .userId({ userId: randomUserId })
    .blacklistItemNotExist({ userId: randomUserId });
});

const createUserIds = async (length: number) => {
  const users = await randomMaker.users(length);
  return users.map((i) => i.user.userId);
};

const testBlacklistAfterRemoveOneItem = async (
  currentUserId: string,
  blacklist: string[]
) => {
  const blacklistAfterRemove = await findBlacklist(currentUserId);
  expect(blacklistAfterRemove.length).to.be.equal(blacklist.length);

  blacklist.forEach((i) => {
    const foundUserId = blacklistAfterRemove.find(
      (j) => i === j.userId
    )?.userId;

    expect(i).to.be.equal(foundUserId);
  });
};

const testBlacklistAfterRemoveAll = async (userId: string) => {
  const blacklistAfterRemoveAll = await findBlacklist(userId);
  expect(blacklistAfterRemoveAll.length).to.be.equal(0);
};

const findBlacklist = async (userId: string) => {
  const { blacklist } = (await services.findOneUserById(userId)) as UserMongo;
  return blacklist;
};
