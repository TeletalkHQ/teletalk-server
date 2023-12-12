import { FullNameWithUserId } from "teletalk-type-store";

import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
  utils.createTestMessage.unitSuccessDescribe(
    "addContactWithUserId",
    "service"
  ),
  () => {
    it(
      utils.createTestMessage.unitSuccessTest(
        "addContactWithUserId",
        "service",
        "should add new contact with target user id"
      ),
      async () => {
        const { sessionId } = await randomMaker.serviceUser();

        const addingContacts: FullNameWithUserId[] = [];

        const length = 10;
        const users = await Promise.all(randomMaker.serviceBatchUsers(length));

        for (const { user: targetUser } of users) {
          const item: FullNameWithUserId = {
            ...randomMaker.fullName(),
            userId: targetUser.userId,
          };

          addingContacts.push(item);

          await services.user.addContactWithUserId({
            fullName: item,
            currentSessionId: sessionId,
            targetUserId: item.userId,
          });

          const { contacts } = await services.user.getContacts({
            currentSessionId: sessionId,
          });

          assertion().contactsWithUserId({
            testValue: contacts,
            equalValue: addingContacts,
          });
        }
      }
    );
  }
);

await utils.generateServiceFailTest(
  "addContactWithUserId",
  "CONTACT_ITEM_EXIST",
  async () => {
    const { sessionId } = await randomMaker.serviceUser();
    const { user: targetUser } = await randomMaker.serviceUser();

    const targetContact: FullNameWithUserId = {
      ...randomMaker.fullName(),
      userId: targetUser.userId,
    };

    await services.user.addContactWithUserId({
      currentSessionId: sessionId,
      fullName: targetContact,
      targetUserId: targetContact.userId,
    });

    return {
      currentSessionId: sessionId,
      fullName: targetContact,
      targetUserId: targetUser.userId,
    };
  }
);

await utils.generateServiceFailTest(
  "addContactWithUserId",
  "CURRENT_USER_NOT_EXIST",
  {
    currentSessionId: randomMaker.sessionId(),
    fullName: randomMaker.fullName(),
    targetUserId: randomMaker.userId(),
  }
);

await utils.generateServiceFailTest(
  "addContactWithUserId",
  "TARGET_USER_NOT_EXIST",
  async () => {
    const { sessionId } = await randomMaker.serviceUser();

    return {
      currentSessionId: sessionId,
      fullName: randomMaker.fullName(),
      targetUserId: randomMaker.userId(),
    };
  }
);
