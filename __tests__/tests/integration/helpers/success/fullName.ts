import { firstNameSuccessTest } from "$/tests/integration/helpers/success/firstName";
import { lastNameSuccessTest } from "$/tests/integration/helpers/success/lastName";

const fullNameSuccessTest = ({ equalValue, testValue }) => {
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
