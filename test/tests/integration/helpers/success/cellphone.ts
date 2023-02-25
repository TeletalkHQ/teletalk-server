import { countryCodeSuccessTest } from "$/tests/integration/helpers/success/countryCode";
import { countryNameSuccessTest } from "$/tests/integration/helpers/success/countryName";
import { phoneNumberSuccessTest } from "$/tests/integration/helpers/success/phoneNumber";

const cellphoneSuccessTest = ({ equalValue, testValue }) => {
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
