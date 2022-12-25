const {
  cellphoneSuccessTest,
} = require("$/tests/integration/helpers/success/cellphone");
const {
  fullNameSuccessTest,
} = require("$/tests/integration/helpers/success/fullName");
const {
  userIdSuccessTest,
} = require("$/tests/integration/helpers/success/userId");

const oneContactSuccessTest = ({ requestValue, responseValue }) => {
  cellphoneSuccessTest({ requestValue, responseValue });

  fullNameSuccessTest({ requestValue, responseValue });

  userIdSuccessTest({
    requestValue: requestValue.userId,
    responseValue: responseValue.userId,
  });
};

module.exports = {
  oneContactSuccessTest,
};
