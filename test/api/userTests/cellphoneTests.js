const { customRequest } = require("@/functions/helpers/CustomRequest");

const {
  userErrors: { CELLPHONE_REQUIRED },
} = require("@/variables/errors/userErrors");

const cellphoneFailureTests = () => {
  it(`It should get error, CELLPHONE_REQUIRED`, async () => {
    await customRequest.sendRequest({}, CELLPHONE_REQUIRED);
  });
};

module.exports = { cellphoneFailureTests };
