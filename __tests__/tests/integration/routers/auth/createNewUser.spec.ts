import { authHelper } from "$/classes/AuthHelper";
import { randomMaker } from "$/classes/RandomMaker";
import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { testHelper } from "$/tests/integration/helpers/testHelper";

import { requesters } from "$/utilities";

describe("createNewUser success tests", () => {
  it("should create new user in db", async () => {
    const cellphone = randomMaker.unusedCellphone();
    const fullName = randomMaker.fullName();

    const helper = authHelper(cellphone, fullName);

    const {
      createResponse: { body },
    } = await helper.createComplete();

    await testCreatedUserSession(body);

    const {
      body: { user },
    } = await requesters
      .getCurrentUserData(body.token)
      .sendFullFeaturedRequest();

    testCreatedUserData(user, cellphone, fullName);
  });
});

describe("createNewUser fail tests", () => {
  const requester = requesters.createNewUser();
  beforeAll(async () => {
    const cellphone = randomMaker.unusedCellphone();
    const helper = authHelper(cellphone);
    await helper.signIn();
    await helper.verify();
    const token = helper.getSignInToken();
    requester.setToken(token);
  });

  const fullName = randomMaker.fullName();
  testHelper
    .createFailTest(requester)
    .authentication()
    .input(fullName)
    .firstName(fullName)
    .lastName(fullName);
});

const testCreatedUserSession = async ({ token }) => {
  const userId = userUtilities.getUserIdFromToken(token);
  const foundSession = await getSavedUserSession(userId, token);

  await testHelper.createSuccessTest().authentication({
    equalValue: foundSession.token,
    testValue: token,
  });
};

const getSavedUserSession = async (userId, token) => {
  const savedUser = await getSavedUser(userId);
  return savedUser.sessions.find((i) => i.token === token);
};
const getSavedUser = async (userId) => {
  return await services.findOneUserById(userId);
};

const testCreatedUserData = (user, cellphone, fullName) => {
  const requestUserData = {
    ...userUtilities.defaultUserData(),
    ...cellphone,
    ...fullName,
  };

  testHelper
    .createSuccessTest()
    .bio({ equalValue: requestUserData.bio, testValue: user.bio })
    .blacklist({
      equalValue: requestUserData.blacklist,
      testValue: user.blacklist,
    })
    .cellphone({
      equalValue: requestUserData,
      testValue: user,
    })
    .contacts({
      equalValue: requestUserData.contacts,
      testValue: user.contacts,
    })
    .fullName({
      equalValue: requestUserData,
      testValue: user,
    })
    .userId({ testValue: user.userId }, { stringEquality: false })
    .username({
      equalValue: requestUserData.username,
      testValue: user.username,
    });
};
