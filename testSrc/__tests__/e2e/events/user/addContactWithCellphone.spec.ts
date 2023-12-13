import { ContactItemWithoutUserId } from "teletalk-type-store";

import { extractor } from "~/classes/Extractor";

import { assertion } from "@/classes/Assertion";
import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe(
  utils.createTestMessage.e2eSuccessDescribe(
    "addContactWithCellphone",
    "event"
  ),
  () => {
    it(
      utils.createTestMessage.e2eSuccessTest(
        "addContactWithCellphone",
        "event",
        "should add users to contacts"
      ),
      async () => {
        const { socket } = await randomMaker.e2eUser();
        const { user: targetUser } = await randomMaker.e2eUser();

        const sendingData: ContactItemWithoutUserId = {
          ...extractor.cellphone(targetUser),
          ...randomMaker.fullName(),
        };

        const {
          data: { newContact },
        } = await utils.requesterCollection
          .addContactWithCellphone(socket)
          .emitFull(sendingData);

        assertion().oneContact({
          testValue: newContact,
          equalValue: { ...sendingData, userId: targetUser.userId },
        });
      }
    );
  }
);
