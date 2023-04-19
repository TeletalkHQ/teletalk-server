import chai from "chai";

import {
  AssertionInitializerHelper,
  assertionInitializerHelper,
} from "$/classes/AssertionInitializerHelper";
import { authHelper } from "$/classes/AuthHelper";
import { e2eFailTestInitializerHelper } from "$/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "$/classes/RandomMaker";
import { authManager } from "@/classes/AuthManager";
import { temporaryClients } from "@/classes/TemporaryClients";
import { userUtilities } from "@/classes/UserUtilities";

import { helpers } from "$/helpers";

import { models } from "@/models";

import { services } from "@/services";

import { Session, TemporaryClient, UserMongo } from "@/types";

describe("verifySignIn success test", () => {
  it("should sign and verify as new user", async () => {
    const cellphone = randomMaker.unusedCellphone();
    const fullName = randomMaker.fullName();

    const helper = authHelper(cellphone, fullName);
    await helper.signIn();
    await helper.verify();
    chai.expect(helper.getResponses().verify.data.newUser).to.be.equal(true);

    const sessionId = authManager.getTokenId(
      helper.getResponses().signIn.data.token,
      authManager.getSignInSecret()
    );

    const client = (await temporaryClients.find(sessionId)) as TemporaryClient;
    chai.expect(client.isVerified).to.be.equal(true);
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

      chai.expect(helper.getResponses().verify.data.newUser).to.be.equal(false);

      sessions.push(helper.getResponses().verify.data.token);
      const assertHelper = assertionInitializerHelper();
      await testUserSession(
        assertHelper,
        helper.getResponses().verify.data.token
      );
    }

    const user = (await services.findOneUser(cellphone)) as UserMongo;

    chai.expect(sessions.length).to.be.equal(user.sessions.length);

    sessions.forEach((item) => {
      const isTokenExist = user.sessions.some(({ token }) => token === item);
      chai.expect(isTokenExist).to.be.true;
    });
  });
});

await helpers.asyncDescribe("verifySignIn fail tests", async () => {
  const cellphone = randomMaker.unusedCellphone();
  const helper = authHelper(cellphone);
  await helper.signIn();
  const requester = helpers.requesters.verify(helper.getClientSocket());

  return () => {
    const data = {
      verificationCode: randomMaker.string(
        models.native.user.verificationCode.length.value
      ),
    };

    e2eFailTestInitializerHelper(requester)
      .authentication()
      .input(data)
      .verificationCode(data);
  };
});

const testUserSession = async (
  builder: AssertionInitializerHelper,
  token: string
) => {
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
