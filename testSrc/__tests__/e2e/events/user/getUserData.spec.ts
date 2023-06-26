import { userUtils } from "~/classes/UserUtils";
import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { helpers } from "@/helpers";

//TODO: Add fail tests

describe("getUserData success tests", () => {
  it("should get currentUser data", async () => {
    const { socket } = await randomMaker.user();
    const requester = helpers.requesterCollection.getUserData(socket);

    for (let i = 0; i < 10; i++) {
      const {
        data: { user: responseUserData },
      } = await requester.sendFullFeaturedRequest();

      const user = (await services.findOneUser({
        userId: responseUserData.userId,
      }))!;

      const userData = userUtils.extractUserData(user);

      assertionInitializerHelper().userData({
        equalValue: userData,
        testValue: responseUserData,
      });
    }
  });
});
