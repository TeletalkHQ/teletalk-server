const { randomMaker } = require("$/classes/RandomMaker");
const { helpers } = require("$/helpers");

const { userUtilities } = require("@/classes/UserUtilities");

const { services } = require("@/services");

const { requesters } = require("$/utilities");

const { testHelper } = require("$/tests/integration/helpers/testHelper");

describe("getCurrentUserData success tests", () => {
  it("should get currentUser data", async () => {
    const users = await randomMaker.users(10);

    for (const { token, user } of users) {
      const data = randomMaker.publicUserData();

      const requester = requesters.updatePublicUserData(token);
      const {
        body: { publicUserData: publicDataFromApi },
      } = await requester.sendFullFeaturedRequest(data);

      const equalValue = { ...data, userId: user.userId };

      testPublicUserData(equalValue, publicDataFromApi);

      const targetUserDataInDb = await services.getTargetUserData({
        userId: user.userId,
      });
      const publicDataFromDb =
        userUtilities.extractPublicUserData(targetUserDataInDb);
      testPublicUserData(equalValue, publicDataFromDb);
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
  const requester = requesters.updatePublicUserData();
  helpers.configureFailTestRequester(requester);

  const data = randomMaker.publicUserData();

  testHelper
    .createFailTest(requester)
    .authentication()
    .input(data)
    .checkCurrentUserStatus(data)
    .bio(data)
    .firstName(data)
    .lastName(data)
    .username(data);
});
