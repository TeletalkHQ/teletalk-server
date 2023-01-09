const {
  firstNameSuccessTest,
} = require("$/tests/integration/helpers/success/firstName");
const {
  lastNameSuccessTest,
} = require("$/tests/integration/helpers/success/lastName");

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

module.exports = { fullNameSuccessTest };
