import { expect } from "chai";

import { authHelper } from "$/classes/AuthHelper";
import { authManager } from "@/classes/AuthManager";
import { randomMaker } from "$/classes/RandomMaker";
import { socketHelper } from "$/classes/SocketHelper";
import { SuccessTestHelper } from "$/classes/SuccessTestHelper";
import { temporaryClients } from "@/classes/TemporaryClients";
import { userUtilities } from "@/classes/UserUtilities";

import { testHelper } from "$/helpers/testHelper";

import { models } from "@/models";

import { services } from "@/services";

import { Session, TemporaryClient, UserMongo } from "@/types";

import { utilities } from "$/utilities";

describe("verifySignInApi success test", () => {
  it("should sign and verify as new user", async () => {
    const cellphone = randomMaker.unusedCellphone();
    const fullName = randomMaker.fullName();

    const helper = authHelper(cellphone, fullName);
    await helper.signIn();
    await helper.verify();
    expect(helper.getResponses().verify.data.newUser).to.be.equal(true);

    const tokenId = authManager.getTokenId(
      helper.getResponses().signIn.data.token,
      authManager.getSignInSecret()
    );

    const client = (await temporaryClients.find(tokenId)) as TemporaryClient;
    expect(client.isVerified).to.be.equal(true);
  });

  it("should verify as exist user", async () => {
    const cellphone = randomMaker.unusedCellphone();
    const fullName = randomMaker.fullName();
    const helper = authHelper(cellphone, fullName);

    await helper.createComplete();

    const sessions = [helper.getResponses().create.data.token];

    for (let i = 0; i < 9; i++) {
      const helper = authHelper(cellphone, fullName);

      await helper.signIn();
      await helper.verify();

      expect(helper.getResponses().verify.data.newUser).to.be.equal(false);

      sessions.push(helper.getResponses().verify.data.token);
      const successTestBuilder = testHelper.createSuccessTest();
      await testUserSession(
        successTestBuilder,
        helper.getResponses().verify.data.token
      );
    }

    const user = (await services.findOneUser(cellphone)) as UserMongo;

    expect(sessions.length).to.be.equal(user.sessions.length);

    sessions.forEach((item) => {
      const isTokenExist = user.sessions.some(({ token }) => token === item);
      expect(isTokenExist).to.be.true;
    });
  });
});

describe("verifySignIn fail tests", () => {
  const clientSocket = socketHelper.createClient();
  const requester = utilities.requesters.verify(clientSocket);

  before(async () => {
    const cellphone = randomMaker.unusedCellphone();
    const helper = authHelper(cellphone);
    await helper.signIn();
    requester.setSocket(helper.getClientSocket());
  });

  const data = {
    verificationCode: randomMaker.string(
      models.native.user.verificationCode.length.value
    ),
  };

  testHelper
    .createFailTest(requester)
    .authentication()
    .input(data)
    .verificationCode(data);
});

const testUserSession = async (builder: SuccessTestHelper, token: string) => {
  const verifiedToken = authManager.verifyToken(token);
  const userId = userUtilities.getUserIdFromVerifiedToken(verifiedToken);
  const foundSession = await getSavedUserSession(userId, token);
  builder.authentication({
    equalValue: foundSession.token,
    testValue: token,
    secret: authManager.getMainSecret(),
  });
};

const getSavedUserSession = async (userId: string, token: string) => {
  const savedUser = (await getSavedUser(userId)) as UserMongo;
  return savedUser.sessions.find((i) => i.token === token) as Session;
};

const getSavedUser = async (userId: string) => {
  return await services.findOneUserById(userId);
};
