import { DBUserData, Sessions } from "teletalk-type-store";

import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
  utils.createTestMessage.unitSuccessDescribe("addSession", "service"),
  () => {
    it(
      utils.createTestMessage.unitSuccessTest(
        "addSession",
        "service",
        "should add new session"
      ),
      async () => {
        const { user: currentUser, sessionId } =
          await randomMaker.serviceUser();

        const length = 10;

        const addingSessions: Sessions = [
          {
            sessionId,
          },
        ];

        for (let i = 0; i < length; i++) {
          const randomSessionId = randomMaker.sessionId();

          await services.user.addSession({
            currentUserId: currentUser.userId,
            sessionId: randomSessionId,
          });

          addingSessions.push({
            sessionId: randomSessionId,
          });

          const { sessions: currentSessions } =
            (await services.user.findByUserId({
              targetUserId: currentUser.userId,
            })) as DBUserData;

          assertion().sessions({
            testValue: currentSessions,
            equalValue: addingSessions,
          });
        }
      }
    );
  }
);

await utils.generateServiceFailTest("addSession", "CURRENT_USER_NOT_EXIST", {
  currentUserId: randomMaker.userId(),
  sessionId: randomMaker.sessionId(),
});
