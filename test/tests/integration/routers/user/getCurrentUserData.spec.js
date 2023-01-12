const { serviceHelper } = require("@/classes/service/ServiceHelper");
const { userUtilities } = require("@/classes/UserUtilities");
const { randomMaker } = require("$/classes/RandomMaker");

const { testHelper } = require("$/tests/integration/helpers/testHelper");

const { requesters } = require("$/utilities");

const { errors } = require("@/variables/errors");

describe("getCurrentUserData success tests", () => {
  it("should get currentUser data", async () => {
    const { token } = await randomMaker.user();
    const requester = requesters.getCurrentUserData();
    requester.setToken(token);

    for (let i = 0; i < 10; i++) {
      const {
        body: { user: responseUserData },
      } = await requester.sendFullFeaturedRequest();

      const user = await serviceHelper.findOneUser(
        {
          "sessions.token": requester.getToken(),
        },
        errors.CURRENT_USER_NOT_EXIST
      );

      const userData = userUtilities.extractUserData(user);

      testHelper.createSuccessTest().userData({
        equalValue: userData,
        testValue: responseUserData,
      });
    }
  });
});
