import { randomMaker } from "$/classes/RandomMaker";
import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { testHelper } from "$/tests/integration/helpers/testHelper";

import { requesters } from "$/utilities";

import { FIELD_TYPE } from "@/variables/others/fieldType";

describe("addBlock successful tests", () => {
  it("should add users to blacklist", async () => {
    const currentUser = await randomMaker.user();
    const requester = requesters.addBlock();
    requester.setToken(currentUser.token);

    const blacklistLength = 10;
    for (let i = 0; i < blacklistLength; i++) {
      const targetUser = await randomMaker.user();
      const cellphone = userUtilities.extractCellphone(targetUser.user);
      const {
        body: { blockedCellphone },
      } = await requester.sendFullFeaturedRequest(cellphone);

      await testAddBlockResponse({
        blockedCellphone,
        currentUser,
        sentData: cellphone,
        targetUser,
      });
    }

    const { blacklist } = await services.findOneUserById(
      currentUser.user.userId
    );

    expect(blacklist).toBeInstanceOf(FIELD_TYPE.ARRAY);
    expect(blacklist.length).toBe(blacklistLength);
  });
});

describe("addBlock fail tests", () => {
  const requester = requesters.addBlock();

  const currentUserSignData = randomMaker.unusedCellphone();
  const targetUserSignData = randomMaker.unusedCellphone();
  const data = {
    blockedCellphone: targetUserSignData,
    selfStuffData: currentUserSignData,
  };

  beforeAll(async () => {
    const { token } = await randomMaker.user(currentUserSignData);
    requester.setToken(token);

    const targetUser = await randomMaker.user(targetUserSignData);
    const cellphone = userUtilities.extractCellphone(targetUser.user);
    await requester.sendFullFeaturedRequest(cellphone);
  });

  const cellphone = randomMaker.unusedCellphone();

  testHelper
    .createFailTest(requester)
    .authentication()
    .input(cellphone)
    .checkCurrentUserStatus(cellphone)
    .cellphone(cellphone)
    .countryCode(cellphone)
    .countryName(cellphone)
    .phoneNumber(cellphone)
    .selfStuff(data.selfStuffData)
    .targetUserNotExist(randomMaker.unusedCellphone())
    .blacklistItemExist(data.blockedCellphone);
});

const testAddBlockResponse = async ({
  blockedCellphone,
  currentUser,
  sentData,
  targetUser,
}) => {
  await testTargetUserBlacklist(targetUser.user.userId);
  const savedBlockItem = await findSavedBlacklist(
    currentUser.user.userId,
    blockedCellphone
  );
  testBlockItem(savedBlockItem, sentData);
  testBlockItem(blockedCellphone, sentData);
};

const findBlacklist = async (userId) => {
  const { blacklist } = await services.findOneUserById(userId);
  return blacklist;
};

const testTargetUserBlacklist = async (targetUserId) => {
  const blacklist = await findBlacklist(targetUserId);
  expect(Object.keys(blacklist)).toHaveLength(0);
  return blacklist;
};

const findSavedBlacklist = async (currentUserId, blockedCellphone) => {
  const blacklist = await findBlacklist(currentUserId);
  const { item } = userUtilities.findByCellphone(blacklist, blockedCellphone);
  return item;
};

const testBlockItem = (testValue, equalValue) => {
  testHelper
    .createSuccessTest()
    .countryName({
      equalValue: equalValue.countryName,
      testValue: testValue.countryName,
    })
    .countryCode({
      equalValue: equalValue.countryCode,
      testValue: testValue.countryCode,
    })
    .phoneNumber({
      equalValue: equalValue.phoneNumber,
      testValue: testValue.phoneNumber,
    });
};
