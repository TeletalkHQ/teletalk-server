import { fullNameSuccessTest } from "$/helpers/success/fullName";
import { userIdSuccessTest } from "$/helpers/success/userId";

import { SuccessTestExecutor } from "$/types";

const oneContactSuccessTest: SuccessTestExecutor = ({
  equalValue,
  testValue,
}) => {
  fullNameSuccessTest({ equalValue, testValue });

  userIdSuccessTest({
    equalValue: equalValue.userId,
    testValue: testValue.userId,
  });
};

export { oneContactSuccessTest };
