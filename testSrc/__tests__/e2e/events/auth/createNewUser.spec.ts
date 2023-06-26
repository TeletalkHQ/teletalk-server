import { Cellphone, FullName, UserData } from "utility-store/lib/types";

import { clientStore } from "~/classes/ClientStore";
import { userUtils } from "~/classes/UserUtils";
import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { authHelper } from "@/classes/AuthHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { helpers } from "@/helpers";

describe("createNewUser success tests", () => {
  it("should create new user in db", async () => {
    const cellphone = randomMaker.unusedCellphone();
    const fullName = randomMaker.fullName();

    const helper = authHelper(cellphone, fullName);

    await helper.createComplete();

    await testCreatedUserClientId(helper.getClientId());

    const { data } = await helpers.requesterCollection
      .getUserData(helper.getClientSocket())
      .sendFullFeaturedRequest();

    testCreatedUserData(data.user, cellphone, fullName);
  });
});

await helpers.asyncDescribe("createNewUser fail tests", async () => {
  const cellphone = randomMaker.unusedCellphone();
  const helper = authHelper(cellphone);
  await helper.signIn();
  await helper.verify();
  const requester = helpers.requesterCollection.createNewUser(
    helper.getClientSocket()
  );

  return () => {
    const fullName = randomMaker.fullName();
    e2eFailTestInitializerHelper(requester)
      .input(fullName)
      .firstName(fullName)
      .lastName(fullName);
  };
});

const testCreatedUserClientId = async (clientId: string) => {
  const { userId } = (await clientStore.find(clientId))!;

  const foundClientId = (await getSavedUserClientId(userId, clientId))!;

  assertionInitializerHelper().clientId({
    equalValue: foundClientId.clientId,
    testValue: clientId,
  });
};

const getSavedUserClientId = async (userId: string, clientId: string) => {
  const savedUser = (await getSavedUser(userId))!;
  return savedUser.clients.find((i) => i.clientId === clientId);
};
const getSavedUser = async (userId: string) => {
  return await services.findOneUserById(userId);
};

const testCreatedUserData = (
  user: UserData,
  cellphone: Cellphone,
  fullName: FullName
) => {
  const requestUserData = {
    ...userUtils.getDefaultUserData(),
    ...cellphone,
    ...fullName,
  };

  assertionInitializerHelper()
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
