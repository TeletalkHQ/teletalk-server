import { userUtilities } from "~/classes/UserUtilities";
import { services } from "~/services";
import { PublicUserData, UserMongo } from "~/types";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { helpers } from "@/helpers";

describe("updatablePublicData success tests", () => {
  it("should get currentUser data", async () => {
    const users = await randomMaker.users(10);

    for (const { socket, user } of users) {
      const data = randomMaker.publicUserData();

      const requester =
        helpers.requesterCollection.updatePublicUserData(socket);
      const {
        data: { publicUserData: publicDataFromEvent },
      } = await requester.sendFullFeaturedRequest(data);

      const equalValue = { ...data, userId: user.userId };

      testPublicUserData(equalValue, publicDataFromEvent);

      const targetUserDataInDb = (await services.getTargetUserData({
        userId: user.userId,
      })) as UserMongo;

      const publicDataFromDb =
        userUtilities.extractPublicUserData(targetUserDataInDb);
      testPublicUserData(equalValue, publicDataFromDb);
    }
  });
});

await helpers.asyncDescribe("updatablePublicData fail tests", async () => {
  const { requester } = await helpers.setupRequester(
    helpers.requesterCollection.updatePublicUserData
  );

  return () => {
    const updatablePublicData = randomMaker.publicUserData();

    e2eFailTestInitializerHelper(requester)
      .input(updatablePublicData)
      .bio(updatablePublicData)
      .firstName(updatablePublicData)
      .lastName(updatablePublicData)
      .username(updatablePublicData);
  };
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
