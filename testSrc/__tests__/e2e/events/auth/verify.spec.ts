import chai from "chai";

import {
  AssertionInitializerHelper,
  assertionInitializerHelper,
} from "$/classes/AssertionInitializerHelper";
import { authHelper } from "$/classes/AuthHelper";
import { e2eFailTestInitializerHelper } from "$/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "$/classes/RandomMaker";
import { authManager } from "@/classes/AuthManager";
import { clientStore } from "@/classes/ClientStore";
import { userUtilities } from "@/classes/UserUtilities";

import { helpers } from "$/helpers";

import { models } from "@/models";

import { services } from "@/services";

import { Session, Client, UserMongo } from "@/types";

describe("verifySignIn success test", () => {
  it("should sign and verify as new user", async () => {
    const cellphone = randomMaker.unusedCellphone();
    const fullName = randomMaker.fullName();

    const helper = authHelper(cellphone, fullName);
    await helper.signIn();
    await helper.verify();
    chai.expect(helper.getResponses().verify.data.newUser).to.be.equal(true);

    const client = (await clientStore.find(helper.getClientId())) as Client;

    chai.expect(client.isVerified).to.be.equal(true);
  });

  it("should verify as exist user", async () => {
    const cellphone = randomMaker.unusedCellphone();
    const fullName = randomMaker.fullName();
    const helper = authHelper(cellphone, fullName);

    await helper.createComplete();

    const { session } = (await clientStore.find(helper.getClientId()))!;
    const sessions = [session];

    for (let i = 0; i < 9; i++) {
      const helper = authHelper(cellphone, fullName);

      await helper.signIn();
      await helper.verify();

      chai.expect(helper.getResponses().verify.data.newUser).to.be.equal(false);

      const { session } = (await clientStore.find(helper.getClientId()))!;
      sessions.push(session);
      const assertHelper = assertionInitializerHelper();
      await testUserSession(assertHelper, session);
    }

    const user = (await services.findOneUser(cellphone)) as UserMongo;

    chai.expect(sessions.length).to.be.equal(user.sessions.length);

    sessions.forEach((item) => {
      const isExist = user.sessions.some(({ session }) => session === item);
      chai.expect(isExist).to.be.true;
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
        models.native.verificationCode.length.value
      ),
    };

    e2eFailTestInitializerHelper(requester).input(data).verificationCode(data);
  };
});

const testUserSession = async (
  builder: AssertionInitializerHelper,
  session: string
) => {
  const verified = authManager.verify(session);
  const userId = userUtilities.getUserIdFromVerified(verified);
  const foundSession = await getSavedUserSession(userId, session);
  builder.authentication({
    equalValue: foundSession.session,
    testValue: session,
    secret: authManager.getMainSecret(),
  });
};

const getSavedUserSession = async (userId: string, session: string) => {
  const savedUser = (await getSavedUser(userId)) as UserMongo;
  return savedUser.sessions.find((i) => i.session === session) as Session;
};

const getSavedUser = async (userId: string) => {
  return await services.findOneUserById(userId);
};
