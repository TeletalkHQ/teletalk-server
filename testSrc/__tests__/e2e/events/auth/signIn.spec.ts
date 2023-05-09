import {
  AssertionInitializerHelper,
  assertionInitializerHelper,
} from "$/classes/AssertionInitializerHelper";
import { authHelper } from "$/classes/AuthHelper";
import { clientInitializer } from "$/classes/ClientInitializer";
import { e2eFailTestInitializerHelper } from "$/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "$/classes/RandomMaker";
import { clientStore } from "@/classes/ClientStore";
import { userUtilities } from "@/classes/UserUtilities";

import { helpers } from "$/helpers";

import { Cellphone, Client } from "@/types";

import { customTypeof } from "custom-typeof";

describe("signIn success test", () => {
  it("should sign as new user", async () => {
    const cellphone = randomMaker.unusedCellphone();
    const helper = authHelper(cellphone);

    await helper.signIn();
    const assertHelper = assertionInitializerHelper();
    await testSavedClient(assertHelper, helper.getClientId(), cellphone);
    await testResponse(assertHelper, helper.getClientId());
  });

  it("should sign as existed user", async () => {
    const { user } = await randomMaker.user();
    const cellphone = userUtilities.extractCellphone(user);

    const helper = authHelper(cellphone);
    await helper.signIn();
    const assertHelper = assertionInitializerHelper();
    await testSavedClient(assertHelper, helper.getClientId(), cellphone);
    await testResponse(assertHelper, helper.getClientId());
  });

  it("should sign multiple time, so client get updated", async () => {
    const cellphone = randomMaker.unusedCellphone();
    const helper = authHelper(cellphone);

    for (let i = 0; i < 10; i++) {
      await helper.signIn();
    }

    await helper.signIn();
    const assertHelper = assertionInitializerHelper();
    await testSavedClient(assertHelper, helper.getClientId(), cellphone);
    await testResponse(assertHelper, helper.getClientId());
  });
});

await helpers.asyncDescribe("signIn fail test", async () => {
  const signInCellphone = randomMaker.unusedCellphone();
  const clientSocket = (await clientInitializer().createComplete()).getClient();
  const requester = helpers.requesterCollection.signIn(clientSocket);

  return () => {
    e2eFailTestInitializerHelper(requester)
      .input(signInCellphone)
      .countryCode(signInCellphone)
      .countryName(signInCellphone)
      .phoneNumber(signInCellphone);
  };
});

const testSavedClient = async (
  assertionHelper: AssertionInitializerHelper,
  clientId: string,
  cellphone: Cellphone
) => {
  const client = (await clientStore.find(clientId)) as Client;
  expect(customTypeof.isObject(client)).toBeTruthy();
  expect(client.countryCode).toBe(cellphone.countryCode);
  expect(client.countryName).toBe(cellphone.countryName);
  expect(client.phoneNumber).toBe(cellphone.phoneNumber);
  expect(client.isVerified).toBe(false);

  assertionHelper
    .verificationCode({
      testValue: client.verificationCode,
    })
    .userId(
      { testValue: client.userId },
      { stringEquality: false, modelCheck: true }
    );
};

//CLEANME: Merge with testSavedClient
const testResponse = async (
  assertionHelper: AssertionInitializerHelper,
  clientId: string
) => {
  const client = (await clientStore.find(clientId)) as Client;

  assertionHelper.userId(
    {
      testValue: client.userId,
    },
    {
      modelCheck: true,
      stringEquality: false,
    }
  );
};
