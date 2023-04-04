import { randomMaker } from "$/classes/RandomMaker";
import { socketHelper } from "$/classes/SocketHelper";

import { testHelper } from "$/helpers/testHelper";

import { utilities } from "$/utilities";

import { services } from "@/services";

import { PublicUserData, UserMongo } from "@/types";

describe("getCurrentUserData success tests", () => {
  it("should get currentUser data", async () => {
    const { socket } = await randomMaker.user();
    const requester = utilities.requesters.getPublicUserData(socket);

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

describe("getPublicUserData fail tests", () => {
  const clientSocket = socketHelper.createClient();
  const requester = utilities.requesters.getPublicUserData(clientSocket);
  before(async () => {
    const { socket } = await randomMaker.user();
    requester.setSocket(socket);
  });

  const data = {
    userId: randomMaker.id(),
  };

  testHelper
    .createFailTest(requester)
    .authentication()
    .input(data)
    .checkCurrentUserStatus(data)
    .userId(data);
});
