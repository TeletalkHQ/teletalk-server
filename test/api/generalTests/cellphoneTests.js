const {
  userErrors: { CELLPHONE_REQUIRED },
} = require("@/variables/errors/userErrors");

const cellphoneFailureTests = (configuredCustomRequest, data = {}) => {
  it("It should get error, CELLPHONE_REQUIRED", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      { ...data, countryCode: "", countryName: "", phoneNumber: "" },
      CELLPHONE_REQUIRED
    );
  });
};

module.exports = { cellphoneFailureTests };
