import { extractor } from "~/classes/Extractor";

import { assertion } from "@/classes/Assertion";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
  utils.createTestMessage.e2eSuccessDescribe("removeContact", "event"),
  () => {
    it(
      utils.createTestMessage.e2eSuccessTest(
        "removeContact",
        "event",
        "should remove users from contacts"
      ),
      async () => {
        const { socket } = await randomMaker.e2eUser();
        const { user: targetUser } = await randomMaker.e2eUser();

        const addingContact = extractor.contactWithUserId(targetUser);

        await utils.requesterCollection
          .addContactWithUserId(socket)
          .emitFull(addingContact);

        const {
          data: { removedContact },
        } = await utils.requesterCollection.removeContact(socket).emitFull({
          userId: addingContact.userId,
        });

        assertion().userId({
          equalValue: addingContact.userId,
          testValue: removedContact.userId,
        });
      }
    );
  }
);
