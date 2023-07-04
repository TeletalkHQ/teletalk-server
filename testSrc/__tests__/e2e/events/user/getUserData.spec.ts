import { extractor } from "utility-store";

import { services } from "~/services";

import { assertionInitializerHelper } from "@/classes/AssertionInitializerHelper";
import { randomMaker } from "@/classes/RandomMaker";
import { helpers } from "@/helpers";

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

      const userData = extractor.userData(user);

      assertionInitializerHelper().userData({
        equalValue: userData,
        testValue: responseUserData,
      });
    }
  });
});
