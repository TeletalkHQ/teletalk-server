const { serviceHelper } = require("@/classes/service/ServiceHelper");

const { testHelper } = require("$/tests/integration/helpers/testHelper");

const { requesters } = require("$/utilities/requesters");

const { errors } = require("@/variables/errors");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

describe("getCurrentUserData success tests", () => {
  it("should get current user data", async () => {
    const requester = requesters.getCurrentUserData();

    const {
      body: { user: responseUserData },
    } = await requester.sendFullFeaturedRequest();

    const user = await serviceHelper.findOneUser(
      {
        "sessions.token": requester.getToken(),
      },
      errors.CURRENT_USER_NOT_EXIST
    );

    const userData = userPropsUtilities.extractUserData(user);

    testHelper.createSuccessTest().userData({
      requestValue: userData,
      responseValue: responseUserData,
    });
  });
});
