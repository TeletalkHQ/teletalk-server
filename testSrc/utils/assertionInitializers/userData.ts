import { AssertionInitializer } from "@/types";
import { bioAssertionInitializer } from "@/utils/assertionInitializers/bio";
import { blacklistAssertionInitializer } from "@/utils/assertionInitializers/blacklist";
import { cellphoneAssertionInitializer } from "@/utils/assertionInitializers/cellphone";
import { contactsAssertionInitializer } from "@/utils/assertionInitializers/contacts";
import { fullNameAssertionInitializer } from "@/utils/assertionInitializers/fullName";
import { userIdAssertionInitializer } from "@/utils/assertionInitializers/userId";
import { usernameAssertionInitializer } from "@/utils/assertionInitializers/username";

export const userDataAssertionInitializer: AssertionInitializer = ({
  equalValue,
  testValue,
}) => {
  bioAssertionInitializer({
    equalValue: equalValue.bio,
    testValue: testValue.bio,
  });

  blacklistAssertionInitializer({
    equalValue: equalValue.blacklist,
    testValue: testValue.blacklist,
  });

  cellphoneAssertionInitializer({ equalValue, testValue });

  contactsAssertionInitializer({
    equalValue: equalValue.contacts,
    testValue: testValue.contacts,
  });

  fullNameAssertionInitializer({ equalValue, testValue });

  userIdAssertionInitializer({
    equalValue: equalValue.userId,
    testValue: testValue.userId,
  });

  usernameAssertionInitializer({
    equalValue: equalValue.username,
    testValue: testValue.username,
  });
};
