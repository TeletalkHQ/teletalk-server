const { CustomRequest } = require("@/functions/helpers/CustomRequest");

const {
  userErrors: {
    properties: {
      CELLPHONE_REQUIRED: { properties: CELLPHONE_REQUIRED },
    },
  },
} = require("@/variables/errors/userErrors");

const cellphoneFailureTests = () => {
  it(`It should get error, CELLPHONE_REQUIRED`, async () => {
    await CustomRequest.sendRequest({}, CELLPHONE_REQUIRED);
  });
};

module.exports = { cellphoneFailureTests };
