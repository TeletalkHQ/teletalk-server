import chai from "chai";

import { userIdAssertionInitializer } from "$/helpers/assertionInitializers/userId";

import { AssertionInitializer } from "$/types";
import { BlackListItem } from "@/types";

import { FIELD_TYPE } from "$/variables";

const blacklistAssertionInitializer: AssertionInitializer = ({
  equalValue,
  testValue,
}) => {
  equalValue.forEach((blacklistItem: BlackListItem) => {
    const foundBlacklistItem = testValue.find(
      (i: BlackListItem) => i.userId === blacklistItem.userId
    );

    chai.expect(foundBlacklistItem).to.be.an(FIELD_TYPE.OBJECT);

    userIdAssertionInitializer({
      equalValue: blacklistItem.userId,
      testValue: foundBlacklistItem.userId,
    });
  });
};

export { blacklistAssertionInitializer };
