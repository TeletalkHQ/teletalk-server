import { PublicUserData } from "utility-store/lib/types";

import { userUtils } from "~/classes/UserUtils";
import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { e2eFailTestInitializerHelper } from "@/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { helpers } from "@/helpers";

describe("updatePublicUserData success tests", () => {
  it("should get user public data", async () => {
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

      const targetUserDataInDb = (await services.findOneUserById({
        userId: user.userId,
      }))!;

      const publicDataFromDb =
        userUtils.extractPublicUserData(targetUserDataInDb);
      testPublicUserData(equalValue, publicDataFromDb);
    }
  });
});

await helpers.asyncDescribe("updatePublicUserData fail tests", async () => {
  const { requester } = await helpers.setupRequester(
    helpers.requesterCollection.updatePublicUserData
  );

  return () => {
    const publicDataForUpdate = randomMaker.publicUserData();

    e2eFailTestInitializerHelper(requester)
      .input(publicDataForUpdate)
      .bio(publicDataForUpdate)
      .firstName(publicDataForUpdate)
      .lastName(publicDataForUpdate)
      .username(publicDataForUpdate);
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
