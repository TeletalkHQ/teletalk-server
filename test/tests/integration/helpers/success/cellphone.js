const {
  countryCodeSuccessTest,
} = require("$/tests/integration/helpers/success/countryCode");
const {
  countryNameSuccessTest,
} = require("$/tests/integration/helpers/success/countryName");
const {
  phoneNumberSuccessTest,
} = require("$/tests/integration/helpers/success/phoneNumber");

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

module.exports = { cellphoneSuccessTest };
