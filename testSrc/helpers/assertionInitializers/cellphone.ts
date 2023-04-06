import { countryCodeAssertionInitializer } from "$/helpers/assertionInitializers/countryCode";
import { countryNameAssertionInitializer } from "$/helpers/assertionInitializers/countryName";
import { phoneNumberAssertionInitializer } from "$/helpers/assertionInitializers/phoneNumber";

import { AssertionInitializer } from "$/types";

const cellphoneAssertionInitializer: AssertionInitializer = ({
  equalValue,
  testValue,
}) => {
  countryCodeAssertionInitializer({
    equalValue: equalValue.countryCode,
    testValue: testValue.countryCode,
  });
  countryNameAssertionInitializer({
    equalValue: equalValue.countryName,
    testValue: testValue.countryName,
  });
  phoneNumberAssertionInitializer({
    equalValue: equalValue.phoneNumber,
    testValue: testValue.phoneNumber,
  });
};

export { cellphoneAssertionInitializer };
