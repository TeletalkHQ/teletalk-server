import { firstNameSuccessTest } from "$/helpers/success/firstName";
import { lastNameSuccessTest } from "$/helpers/success/lastName";

import { SuccessTestExecutor } from "$/types";

const fullNameSuccessTest: SuccessTestExecutor = ({
  equalValue,
  testValue,
}) => {
  firstNameSuccessTest({
    equalValue: equalValue.firstName,
    testValue: testValue.firstName,
  });

  lastNameSuccessTest({
    equalValue: equalValue.lastName,
    testValue: testValue.lastName,
  });
};

export { fullNameSuccessTest };
