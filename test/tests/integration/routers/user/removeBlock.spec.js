const {
  isDataHasEqualityWithTargetCellphone,
} = require("utility-store/src/utilities/utilities");

const { randomMaker } = require("$/classes/RandomMaker");
const { userUtilities } = require("@/classes/UserUtilities");

const { services } = require("@/services");

const { testHelper } = require("$/tests/integration/helpers/testHelper");

const { requesters } = require("$/utilities");

describe("removeContact successful test", () => {
  it("should add users to blacklist", async () => {
    const blacklistLength = 10;
    const cellphones = await createCellphones(blacklistLength);

    const currentUser = await randomMaker.user();

    const addBlockRequester = requesters.addBlock();
    addBlockRequester.setToken(currentUser.token);
    for (const cellphone of cellphones) {
      await addBlockRequester.sendFullFeaturedRequest(cellphone);
    }

    const removeBlockRequester = requesters.removeBlock();
    removeBlockRequester.setToken(currentUser.token);

    for (const blacklistItem of [...cellphones]) {
      const {
        body: { removedBlock },
      } = await removeBlockRequester.sendFullFeaturedRequest(blacklistItem);

      testRemovedBlock({
        testValue: removedBlock,
        equalValue: blacklistItem,
      });

      cellphones.shift();
      await testBlacklistAfterRemoveOneItem(currentUser, cellphones);
    }

    await testBlacklistAfterRemoveAll(currentUser.user.userId);
  });
});

describe("removeBlock fail tests", () => {
  const cellphone = randomMaker.unusedCellphone();
  const requester = requesters.removeBlock();

  beforeAll(async () => {
    const { token } = await randomMaker.user(cellphone);
    requester.setToken(token);
  });

  testHelper
    .createFailTest(requester)
    .authentication()
    .input(cellphone)
    .checkCurrentUserStatus(cellphone)
    .cellphone(cellphone)
    .countryCode(cellphone)
    .countryName(cellphone)
    .phoneNumber(cellphone)
    .selfStuff(cellphone)
    .blacklistItemNotExist(randomMaker.unusedCellphone());
});

const createCellphones = async (length) => {
  const users = await randomMaker.users(length);
  return users.map((i) => userUtilities.extractCellphone(i.user));
};

const testRemovedBlock = ({ equalValue, testValue }) => {
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

const testBlacklistAfterRemoveOneItem = async (currentUser, blacklist) => {
  const blacklistAfterRemove = await findBlacklist(currentUser.user.userId);
  expect(blacklistAfterRemove.length).toBe(blacklist.length);

  blacklist.forEach((i) => {
    const removedCellphone = blacklistAfterRemove.find((j) =>
      isDataHasEqualityWithTargetCellphone(i, j)
    );
    expect(i).toEqual(userUtilities.extractCellphone(removedCellphone));
  });
};

const testBlacklistAfterRemoveAll = async (userId) => {
  const blacklistAfterRemoveAll = await findBlacklist(userId);
  expect(blacklistAfterRemoveAll.length).toBe(0);
};

const findBlacklist = async (userId) => {
  const { blacklist } = await services.findOneUserById(userId);
  return blacklist;
};
