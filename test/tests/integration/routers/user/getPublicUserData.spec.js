const { randomMaker } = require("$/classes/RandomMaker");
const { helpers } = require("$/helpers");

const { testHelper } = require("$/tests/integration/helpers/testHelper");

const { requesters } = require("$/utilities");

const { services } = require("@/services");

describe("getCurrentUserData success tests", () => {
  it("should get currentUser data", async () => {
    const { token } = await randomMaker.user();
    const requester = requesters.getPublicUserData();
    requester.setToken(token);

    const users = await randomMaker.users(10);

    for (const { user: targetUserData } of users) {
      const {
        body: { publicUserData },
      } = await requester.sendFullFeaturedRequest({
        userId: targetUserData.userId,
      });

      const targetUserDataInDb = await services.getTargetUserData({
        userId: targetUserData.userId,
      });

      testPublicUserData(targetUserDataInDb, publicUserData);
      testPublicUserData(targetUserData, publicUserData);
    }
  });
});

const testPublicUserData = (equalValue, testValue) => {
  testHelper
    .createSuccessTest()
    .firstName({
      equalValue: equalValue.firstName,
      testValue: testValue.firstName,
    })
    .lastName({
      equalValue: equalValue.lastName,
      testValue: testValue.lastName,
    })
    .bio({
      equalValue: equalValue.bio,
      testValue: testValue.bio,
    })
    .username({
      equalValue: equalValue.username,
      testValue: testValue.username,
    })
    .userId({
      equalValue: equalValue.userId,
      testValue: testValue.userId,
    });
};

describe("getPublicUserData fail tests", () => {
  const requester = requesters.getPublicUserData();
  helpers.configureFailTestRequester(requester);

  const data = {
    userId: randomMaker.id(),
  };

  testHelper
    .createFailTest(requester)
    .authentication()
    .input(data)
    .checkCurrentUserStatus(data)
    .userId(data);
});
