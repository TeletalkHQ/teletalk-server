import { BlackListItem } from "utility-store/lib/types";

import { userIdAssertionInitializer } from "@/helpers/assertionInitializers/userId";
import { AssertionInitializer } from "@/types";
import { FIELD_TYPE } from "@/variables";

export const blacklistAssertionInitializer: AssertionInitializer = ({
  equalValue,
  testValue,
}) => {
  equalValue.forEach((blacklistItem: BlackListItem) => {
    const foundBlacklistItem = testValue.find(
      (i: BlackListItem) => i.userId === blacklistItem.userId
    );

    expect(foundBlacklistItem).toBe(FIELD_TYPE.OBJECT);

    userIdAssertionInitializer({
      equalValue: blacklistItem.userId,
      testValue: foundBlacklistItem.userId,
    });
  });
};
