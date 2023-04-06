import { firstNameAssertionInitializer } from "$/helpers/assertionInitializers/firstName";
import { lastNameAssertionInitializer } from "$/helpers/assertionInitializers/lastName";

import { AssertionInitializer } from "$/types";

const fullNameAssertionInitializer: AssertionInitializer = ({
  equalValue,
  testValue,
}) => {
  firstNameAssertionInitializer({
    equalValue: equalValue.firstName,
    testValue: testValue.firstName,
  });

  lastNameAssertionInitializer({
    equalValue: equalValue.lastName,
    testValue: testValue.lastName,
  });
};

export { fullNameAssertionInitializer };
