import { countryCodeSuccessTest } from "$/helpers/success/countryCode";
import { countryNameSuccessTest } from "$/helpers/success/countryName";
import { phoneNumberSuccessTest } from "$/helpers/success/phoneNumber";

import { SuccessTestExecutor } from "$/types";

const cellphoneSuccessTest: SuccessTestExecutor = ({
  equalValue,
  testValue,
}) => {
  countryCodeSuccessTest({
    equalValue: equalValue.countryCode,
    testValue: testValue.countryCode,
  });
  countryNameSuccessTest({
    equalValue: equalValue.countryName,
    testValue: testValue.countryName,
  });
  phoneNumberSuccessTest({
    equalValue: equalValue.phoneNumber,
    testValue: testValue.phoneNumber,
  });
};

export { cellphoneSuccessTest };
