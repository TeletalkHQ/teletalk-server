import { clientStore } from "~/classes/ClientStore";
import { models } from "~/models";
import { services } from "~/services";
import { ClientObjType, UserMongo } from "~/types";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { authHelper } from "@/classes/AuthHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { helpers } from "@/helpers";

describe("verifySignIn success test", () => {
  it("should sign and verify as new user", async () => {
    const cellphone = randomMaker.unusedCellphone();
    const fullName = randomMaker.fullName();

    const helper = authHelper(cellphone, fullName);
    await helper.signIn();
    await helper.verify();
    expect(helper.getResponses().verify.data.newUser).toBe(true);

    const client = (await clientStore.find(helper.getClientId()))!;

    expect(client.isVerified).toBe(true);
  });

  it("should verify as exist user", async () => {
    const cellphone = randomMaker.unusedCellphone();
    const fullName = randomMaker.fullName();
    const helper = authHelper(cellphone, fullName);

    await helper.createComplete();

    const clients = [helper.getClientId()];

    for (let i = 0; i < 9; i++) {
      const helper = authHelper(cellphone, fullName);

      await helper.signIn();
      await helper.verify();

      expect(helper.getResponses().verify.data.newUser).toBeFalsy();

      clients.push(helper.getClientId());
      await testUserClientId(helper.getClientId());
    }

    const user = (await services.findOneUser(cellphone)) as UserMongo;

    expect(clients.length).toBe(user.clients.length);

    clients.forEach((item) => {
      const isExist = user.clients.some(({ clientId }) => clientId === item);
      expect(isExist).toBe(true);
    });
  });
});

await helpers.asyncDescribe("verifySignIn fail tests", async () => {
  const cellphone = randomMaker.unusedCellphone();
  const helper = authHelper(cellphone);
  await helper.signIn();
  const requester = helpers.requesterCollection.verify(
    helper.getClientSocket()
  );

  return () => {
    const data = {
      verificationCode: randomMaker.string(
        models.native.verificationCode.length
      ),
    };

    e2eFailTestInitializerHelper(requester).input(data).verificationCode(data);
  };
});

const testUserClientId = async (clientId: string) => {
  const { userId } = (await clientStore.find(clientId))!;
  const foundClient = await getSavedUserClient(userId, clientId);

  assertionInitializerHelper().clientId({
    equalValue: foundClient.clientId,
    testValue: clientId,
  });
};

const getSavedUserClient = async (userId: string, clientId: string) => {
  const savedUser = (await getSavedUser(userId)) as UserMongo;
  return savedUser.clients.find(
    (i) => i.clientId === clientId
  ) as ClientObjType;
};

const getSavedUser = async (userId: string) => {
  return await services.findOneUserById(userId);
};
