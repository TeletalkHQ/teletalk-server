import { DBUserData, FullNameWithUserId } from "teletalk-type-store";

import { services } from "~/services";

import { assertion } from "@/classes/Assertion";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
  utils.createTestMessage.unitSuccessDescribe("removeContact", "service"),
  () => {
    it(
      utils.createTestMessage.unitSuccessTest(
        "removeContact",
        "service",
        "should remove contact with specified userId"
      ),
      async () => {
        const { user: currentUser, sessionId } =
          await randomMaker.serviceUser();

        const removingContacts: FullNameWithUserId[] = [];

        const length = 10;
        const users = await Promise.all(randomMaker.serviceBatchUsers(length));

        for (const { user: targetUser } of users) {
          const addingContact = {
            ...randomMaker.fullName(),
            userId: targetUser.userId,
          };

          await services.user.addContactWithUserId({
            currentSessionId: sessionId,
            fullName: addingContact,
            targetUserId: addingContact.userId,
          });

          removingContacts.push(addingContact);
        }

        for (const { user: targetUser } of [...users]) {
          await services.user.removeContact({
            targetUserId: targetUser.userId,
            currentSessionId: sessionId,
          });

          removingContacts.shift();

          const { contacts } = (await services.user.findByUserId({
            targetUserId: currentUser.userId,
          })) as DBUserData;

          assertion().contactsWithUserId({
            testValue: contacts,
            equalValue: removingContacts,
          });
        }
      }
    );
  }
);

await utils.generateServiceFailTest("removeContact", "CURRENT_USER_NOT_EXIST", {
  currentSessionId: randomMaker.sessionId(),
  targetUserId: randomMaker.userId(),
});

await utils.generateServiceFailTest(
  "removeContact",
  "CONTACT_ITEM_NOT_EXIST",
  async () => {
    const { sessionId } = await randomMaker.serviceUser();

    return {
      currentSessionId: sessionId,
      targetUserId: randomMaker.userId(),
    };
  }
);
