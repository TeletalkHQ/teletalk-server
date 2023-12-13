import { BlackList, DBUserData } from "teletalk-type-store";

import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
  utils.createTestMessage.unitSuccessDescribe("removeBlock", "service"),
  () => {
    it(
      utils.createTestMessage.unitSuccessTest(
        "removeBlock",
        "service",
        "should remove user from blacklist"
      ),
      async () => {
        const { user: currentUser, sessionId } =
          await randomMaker.serviceUser();

        const blockingUsers: BlackList = [];

        const length = 10;
        const users = await Promise.all(randomMaker.serviceBatchUsers(length));

        for (const { user: targetUser } of users) {
          await services.user.addBlock({
            currentSessionId: sessionId,
            targetUserId: targetUser.userId,
          });

          blockingUsers.push({
            userId: targetUser.userId,
          });
        }

        for (const { user: targetUser } of [...users]) {
          await services.user.removeBlock({
            currentSessionId: sessionId,
            targetUserId: targetUser.userId,
          });

          blockingUsers.shift();

          const { blacklist } = (await services.user.findByUserId({
            targetUserId: currentUser.userId,
          })) as DBUserData;

          assertion().blacklist({
            testValue: blacklist,
            equalValue: blockingUsers,
          });
        }
      }
    );
  }
);

await utils.generateServiceFailTest("removeBlock", "CURRENT_USER_NOT_EXIST", {
  currentSessionId: randomMaker.sessionId(),
  targetUserId: randomMaker.userId(),
});

await utils.generateServiceFailTest(
  "removeBlock",
  "BLACKLIST_ITEM_NOT_EXIST",
  async () => {
    const { sessionId } = await randomMaker.serviceUser();

    return {
      currentSessionId: sessionId,
      targetUserId: randomMaker.userId(),
    };
  }
);
