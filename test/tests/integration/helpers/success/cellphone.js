const {
  countryCodeSuccessTest,
} = require("$/tests/integration/helpers/success/countryCode");
const {
  countryNameSuccessTest,
} = require("$/tests/integration/helpers/success/countryName");
const {
  phoneNumberSuccessTest,
} = require("$/tests/integration/helpers/success/phoneNumber");

const cellphoneSuccessTest = ({ requestValue, responseValue }) => {
  countryCodeSuccessTest({
    requestValue: requestValue.countryCode,
    responseValue: responseValue.countryCode,
  });
  countryNameSuccessTest({
    requestValue: requestValue.countryName,
    responseValue: responseValue.countryName,
  });
  phoneNumberSuccessTest({
    requestValue: requestValue.phoneNumber,
    responseValue: responseValue.phoneNumber,
  });
};

module.exports = { cellphoneSuccessTest };
