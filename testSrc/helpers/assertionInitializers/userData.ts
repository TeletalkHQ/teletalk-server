import { bioAssertionInitializer } from "$/helpers/assertionInitializers/bio";
import { blacklistAssertionInitializer } from "$/helpers/assertionInitializers/blacklist";
import { cellphoneAssertionInitializer } from "$/helpers/assertionInitializers/cellphone";
import { contactsAssertionInitializer } from "$/helpers/assertionInitializers/contacts";
import { fullNameAssertionInitializer } from "$/helpers/assertionInitializers/fullName";
import { userIdAssertionInitializer } from "$/helpers/assertionInitializers/userId";
import { usernameAssertionInitializer } from "$/helpers/assertionInitializers/username";

import { AssertionInitializer } from "$/types";

const userDataAssertionInitializer: AssertionInitializer = ({
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

export { userDataAssertionInitializer };
