const {
  firstNameSuccessTest,
} = require("$/tests/integration/helpers/success/firstName");
const {
  lastNameSuccessTest,
} = require("$/tests/integration/helpers/success/lastName");

const fullNameSuccessTest = ({ requestValue, responseValue }) => {
  firstNameSuccessTest({
    requestValue: requestValue.firstName,
    responseValue: responseValue.firstName,
  });

  lastNameSuccessTest({
    requestValue: requestValue.lastName,
    responseValue: responseValue.lastName,
  });
};

module.exports = { fullNameSuccessTest };
