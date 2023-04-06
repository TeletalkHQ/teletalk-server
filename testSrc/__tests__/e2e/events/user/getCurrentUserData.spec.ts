import { assertionInitializerHelper } from "$/classes/AssertionInitializerHelper";
import { randomMaker } from "$/classes/RandomMaker";
import { userUtilities } from "@/classes/UserUtilities";

import { services } from "@/services";

import { UserMongo } from "@/types";

import { utilities } from "$/utilities";

//TODO: Add fail tests

describe("getCurrentUserData success tests", () => {
  it("should get currentUser data", async () => {
    const { socket } = await randomMaker.user();
    const requester = utilities.requesters.getCurrentUserData(socket);

    for (let i = 0; i < 10; i++) {
      const {
        data: { user: responseUserData },
      } = await requester.sendFullFeaturedRequest();

      const user = (await services.findOneUser({
        userId: responseUserData.userId,
      })) as UserMongo;

      const userData = userUtilities.extractUserData(user);

      assertionInitializerHelper().userData({
        equalValue: userData,
        testValue: responseUserData,
      });
    }
  });
});
