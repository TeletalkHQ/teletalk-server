import { assertion } from "@/classes/Assertion";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
  utils.createTestMessage.e2eSuccessDescribe("getUserData", "event"),
  () => {
    it(
      utils.createTestMessage.e2eSuccessTest(
        "getUserData",
        "event",
        "should get currentUser data"
      ),
      async () => {
        const { socket, user } = await randomMaker.e2eUser();

        const {
          data: { user: receivedUserData },
        } = await utils.requesterCollection.getUserData(socket).emitFull();

        assertion().userData({
          equalValue: {
            ...user,
            sessions: [],
          },
          testValue: {
            ...receivedUserData,
            sessions: [],
          },
        });
      }
    );
  }
);
