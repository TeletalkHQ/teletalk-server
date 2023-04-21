import { assertionInitializerHelper } from "$/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "$/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "$/classes/RandomMaker";

import { helpers } from "$/helpers";

import { services } from "@/services";

import { PublicUserData, UserMongo } from "@/types";

describe("getUserData success tests", () => {
  it("should get currentUser data", async () => {
    const { socket } = await randomMaker.user();
    const requester = helpers.requesterCollection.getPublicUserData(socket);

    const users = await randomMaker.users(10);

    for (const { user: targetUserData } of users) {
      const {
        data: { publicUserData },
      } = await requester.sendFullFeaturedRequest({
        userId: targetUserData.userId,
      });

      const targetUserDataInDb = (await services.getTargetUserData({
        userId: targetUserData.userId,
      })) as UserMongo;

      testPublicUserData(targetUserDataInDb, publicUserData as PublicUserData);
      testPublicUserData(targetUserData, publicUserData as PublicUserData);
    }
  });
});

const testPublicUserData = (
  equalValue: PublicUserData,
  testValue: PublicUserData
) => {
  assertionInitializerHelper()
    .firstName({
      equalValue: equalValue.firstName,
      testValue: testValue.firstName,
    })
    .lastName({
      equalValue: equalValue.lastName,
      testValue: testValue.lastName,
    })
    .bio({
      equalValue: equalValue.bio,
      testValue: testValue.bio,
    })
    .username({
      equalValue: equalValue.username,
      testValue: testValue.username,
    })
    .userId({
      equalValue: equalValue.userId,
      testValue: testValue.userId,
    });
};

await helpers.asyncDescribe("getPublicUserData fail tests", async () => {
  const { requester } = await helpers.setupRequester(
    helpers.requesterCollection.getPublicUserData
  );

  return () => {
    const data = {
      userId: randomMaker.id(),
    };

    e2eFailTestInitializerHelper(requester).input(data).userId(data);
  };
});
