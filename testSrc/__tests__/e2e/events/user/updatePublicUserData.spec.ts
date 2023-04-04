import { randomMaker } from "$/classes/RandomMaker";
import { socketHelper } from "$/classes/SocketHelper";
import { userUtilities } from "@/classes/UserUtilities";

import { testHelper } from "$/helpers/testHelper";

import { services } from "@/services";

import { PublicUserData, UserMongo } from "@/types";

import { utilities } from "$/utilities";

describe("getCurrentUserData success tests", () => {
  it("should get currentUser data", async () => {
    const users = await randomMaker.users(10);

    for (const { socket, user } of users) {
      const data = randomMaker.publicUserData();

      const requester = utilities.requesters.updatePublicUserData(socket);
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

describe("getPublicUserData fail tests", () => {
  const clientSocket = socketHelper.createClient();
  const requester = utilities.requesters.updatePublicUserData(clientSocket);

  before(async () => {
    const { socket } = await randomMaker.user();
    requester.setSocket(socket);
  });

  const { status, ...updatablePublicData } = randomMaker.publicUserData();

  testHelper
    .createFailTest(requester)
    .authentication()
    .input(updatablePublicData)
    .checkCurrentUserStatus(updatablePublicData)
    .bio(updatablePublicData)
    .firstName(updatablePublicData)
    .lastName(updatablePublicData)
    .username(updatablePublicData);
});

const testPublicUserData = (
  equalValue: PublicUserData,
  testValue: PublicUserData
) => {
  testHelper
    .createSuccessTest()
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
