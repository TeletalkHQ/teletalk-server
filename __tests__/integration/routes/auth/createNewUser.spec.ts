import { authHelper } from "$/classes/AuthHelper";
import { authManager } from "@/classes/AuthManager";
import { randomMaker } from "$/classes/RandomMaker";
import { socketHelper } from "$/classes/SocketHelper";
import { userUtilities } from "@/classes/UserUtilities";

import { testHelper } from "$/helpers/testHelper";

import { services } from "@/services";

import { Cellphone, FullName, Session, UserMongo } from "@/types";

import { utilities } from "$/utilities";

describe("createNewUser success tests", () => {
  it("should create new user in db", async () => {
    const cellphone = randomMaker.unusedCellphone();
    const fullName = randomMaker.fullName();

    const helper = authHelper(cellphone, fullName);

    await helper.createComplete();

    const { token } = helper.getResponses().create.data;
    await testCreatedUserSession(token);

    const { data } = await utilities.requesters
      .getCurrentUserData(helper.getClientSocket())
      .sendFullFeaturedRequest();

    testCreatedUserData(data.user, cellphone, fullName);
  });
});

describe("createNewUser fail tests", () => {
  const clientSocket = socketHelper.createClient();
  const requester = utilities.requesters.createNewUser(clientSocket);
  before(async () => {
    const cellphone = randomMaker.unusedCellphone();
    const helper = authHelper(cellphone);
    await helper.signIn();
    await helper.verify();
    requester.setSocket(helper.getClientSocket());
  });

  const fullName = randomMaker.fullName();
  testHelper
    .createFailTest(requester)
    .authentication()
    .input(fullName)
    .firstName(fullName)
    .lastName(fullName);
});

const testCreatedUserSession = async (token: string) => {
  const verifiedToken = authManager.verifyToken(token);
  const userId = userUtilities.getUserIdFromVerifiedToken(verifiedToken);
  const foundSession = (await getSavedUserSession(userId, token)) as Session;

  testHelper.createSuccessTest().authentication({
    equalValue: foundSession.token,
    testValue: token,
    secret: authManager.getMainSecret(),
  });
};

const getSavedUserSession = async (userId: string, token: string) => {
  const savedUser = (await getSavedUser(userId)) as UserMongo;
  return savedUser.sessions.find((i) => i.token === token);
};
const getSavedUser = async (userId: string) => {
  return await services.findOneUserById(userId);
};

const testCreatedUserData = (
  user: UserMongo,
  cellphone: Cellphone,
  fullName: FullName
) => {
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
    .userId(
      { testValue: user.userId },
      { stringEquality: false, modelCheck: true }
    )
    .username({
      equalValue: requestUserData.username,
      testValue: user.username,
    });
};
