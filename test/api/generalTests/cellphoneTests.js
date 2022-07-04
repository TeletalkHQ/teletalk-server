const {
  userErrors: { CELLPHONE_REQUIRED },
} = require("@/variables/errors/userErrors");

const cellphoneFailureTests = (customRequest, data = {}) => {
  it(`It should get error, CELLPHONE_REQUIRED`, async () => {
    await customRequest.sendRequest(
      { ...data, countryCode: "", countryName: "", phoneNumber: "" },
      CELLPHONE_REQUIRED
    );
  });
};

module.exports = { cellphoneFailureTests };
