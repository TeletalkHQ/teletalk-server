import { cellphoneSuccessTest } from "$/tests/integration/helpers/success/cellphone";
import { fullNameSuccessTest } from "$/tests/integration/helpers/success/fullName";
import { userIdSuccessTest } from "$/tests/integration/helpers/success/userId";

const oneContactSuccessTest = ({ equalValue, testValue }) => {
  cellphoneSuccessTest({ equalValue, testValue });

  fullNameSuccessTest({ equalValue, testValue });

  userIdSuccessTest({
    equalValue: equalValue.userId,
    testValue: testValue.userId,
  });
};

export { oneContactSuccessTest };
