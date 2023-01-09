const {
  cellphoneSuccessTest,
} = require("$/tests/integration/helpers/success/cellphone");
const {
  fullNameSuccessTest,
} = require("$/tests/integration/helpers/success/fullName");
const {
  userIdSuccessTest,
} = require("$/tests/integration/helpers/success/userId");

const oneContactSuccessTest = ({ equalValue, testValue }) => {
  cellphoneSuccessTest({ equalValue, testValue });

  fullNameSuccessTest({ equalValue, testValue });

  userIdSuccessTest({
    equalValue: equalValue.userId,
    testValue: testValue.userId,
  });
};

module.exports = {
  oneContactSuccessTest,
};
