import chai from "chai";

import {
  AssertionInitializerHelper,
  assertionInitializerHelper,
} from "$/classes/AssertionInitializerHelper";
import { authHelper } from "$/classes/AuthHelper";
import { clientInitializer } from "$/classes/ClientInitializer";
import { e2eFailTestInitializerHelper } from "$/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "$/classes/RandomMaker";
import { authManager } from "@/classes/AuthManager";
import { temporaryClients } from "@/classes/TemporaryClients";
import { userUtilities } from "@/classes/UserUtilities";

import { helpers } from "$/helpers";

import { Cellphone, TemporaryClient } from "@/types";

import { FIELD_TYPE } from "$/variables/fieldType";

describe("signIn success test", () => {
  it("should sign as new user", async () => {
    const cellphone = randomMaker.unusedCellphone();
    const helper = authHelper(cellphone);

    await helper.signIn();
    const { data } = helper.getResponses().signIn;
    const assertHelper = assertionInitializerHelper();
    await testSavedTemporaryClient(assertHelper, data.token, cellphone);
    await testResponseToken(assertHelper, data.token);
  });

  it("should sign as existed user", async () => {
    const { user } = await randomMaker.user();
    const cellphone = userUtilities.extractCellphone(user);

    const helper = authHelper(cellphone);
    await helper.signIn();
    const { data } = helper.getResponses().signIn;
    const assertHelper = assertionInitializerHelper();
    await testSavedTemporaryClient(assertHelper, data.token, cellphone);
    await testResponseToken(assertHelper, data.token);
  });

  it("should sign multiple time, so temporary client get updated", async () => {
    const cellphone = randomMaker.unusedCellphone();
    const helper = authHelper(cellphone);

    for (let i = 0; i < 10; i++) {
      await helper.signIn();
    }

    await helper.signIn();
    const { token } = helper.getResponses().signIn.data;
    const assertHelper = assertionInitializerHelper();
    await testSavedTemporaryClient(assertHelper, token, cellphone);
    await testResponseToken(assertHelper, token);
  });
});

await helpers.asyncDescribe("signIn fail test", async () => {
  const signInCellphone = randomMaker.unusedCellphone();
  const clientSocket = await clientInitializer.createClient();
  const requester = helpers.requesters.signIn(clientSocket);

  return () => {
    e2eFailTestInitializerHelper(requester)
      .input(signInCellphone)
      .countryCode(signInCellphone)
      .countryName(signInCellphone)
      .phoneNumber(signInCellphone);
  };
});

const testSavedTemporaryClient = async (
  builder: AssertionInitializerHelper,
  token: string,
  cellphone: Cellphone
) => {
  const tokenId = authManager.getTokenId(token, authManager.getSignInSecret());
  const temporaryClient = (await temporaryClients.find(
    tokenId
  )) as TemporaryClient;
  chai.expect(temporaryClient).to.be.an(FIELD_TYPE.OBJECT);
  chai.expect(temporaryClient.countryCode).to.be.equal(cellphone.countryCode);
  chai.expect(temporaryClient.countryName).to.be.equal(cellphone.countryName);
  chai.expect(temporaryClient.phoneNumber).to.be.equal(cellphone.phoneNumber);
  chai.expect(temporaryClient.isVerified).to.be.equal(false);
  builder.verificationCode({ testValue: temporaryClient.verificationCode });
};

const testResponseToken = async (
  builder: AssertionInitializerHelper,
  token: string
) => {
  const tokenId = authManager.getTokenId(token, authManager.getSignInSecret());

  builder.userId(
    {
      testValue: tokenId,
    },
    {
      modelCheck: true,
      stringEquality: false,
    }
  );
};
