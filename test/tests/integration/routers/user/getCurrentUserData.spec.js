const { serviceHelper } = require("@/classes/service/ServiceHelper");

const { testHelper } = require("$/tests/integration/helpers/testHelper");

const { requesters } = require("$/utilities/requesters");

const { errors } = require("@/variables/errors");
const { userPropsUtilities } = require("@/classes/UserPropsUtilities");

describe("getCurrentUserData success tests", () => {
  it("should get current user data", async () => {
    const customRequest = requesters.getCurrentUserData();

    const {
      body: { user: responseUserData },
    } = await customRequest.sendFullFeaturedRequest();

    const requestUser = await serviceHelper.findOneUser(
      {
        "sessions.token": customRequest.getToken(),
      },
      errors.CURRENT_USER_NOT_EXIST
    );

    const requestUserData = userPropsUtilities.extractUserData(requestUser);

    testHelper.createSuccessTest().userData({
      requestValue: requestUserData,
      responseValue: responseUserData,
    });
  });
});
