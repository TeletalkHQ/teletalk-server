import { extractor } from "~/classes/Extractor";

import { assertion } from "@/classes/Assertion";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
  utils.createTestMessage.e2eSuccessDescribe("getContacts", "event"),
  () => {
    it(
      utils.createTestMessage.e2eSuccessTest(
        "getContacts",
        "event",
        "should get contacts"
      ),
      async () => {
        const { socket } = await randomMaker.e2eUser();

        const { user: targetUser } = await randomMaker.e2eUser();
        const addingContact = extractor.contact(targetUser);
        await utils.requesterCollection
          .addContactWithCellphone(socket)
          .emitFull(addingContact);

        const {
          data: { contacts },
        } = await utils.requesterCollection.getContacts(socket).emitFull();

        assertion().oneContact({
          testValue: contacts.at(0)!,
          equalValue: addingContact,
        });
      }
    );
  }
);
