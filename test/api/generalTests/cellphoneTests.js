const { errors } = require("@/variables/errors/errors");

const cellphoneFailureTests = (configuredCustomRequest, data = {}) => {
  it("It should get error, CELLPHONE_REQUIRED", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      { ...data, countryCode: "", countryName: "", phoneNumber: "" },
      errors.CELLPHONE_REQUIRED
    );
  });
};

module.exports = { cellphoneFailureTests };
