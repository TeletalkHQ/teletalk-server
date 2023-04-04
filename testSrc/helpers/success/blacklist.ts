import { expect } from "chai";

import { userIdSuccessTest } from "$/helpers/success/userId";

import { SuccessTestExecutor } from "$/types";
import { BlackListItem } from "@/types";

import { FIELD_TYPE } from "$/variables/fieldType";

const blacklistSuccessTest: SuccessTestExecutor = ({
  equalValue,
  testValue,
}) => {
  equalValue.forEach((blacklistItem: BlackListItem) => {
    const foundBlacklistItem = testValue.find(
      (i: BlackListItem) => i.userId === blacklistItem.userId
    );

    expect(foundBlacklistItem).to.be.an(FIELD_TYPE.OBJECT);

    userIdSuccessTest({
      equalValue: blacklistItem.userId,
      testValue: foundBlacklistItem.userId,
    });
  });
};

export { blacklistSuccessTest };
