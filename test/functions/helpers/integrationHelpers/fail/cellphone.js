const { errors } = require("@/variables/errors");

const cellphone = (configuredCustomRequest, data = {}) => {
  it("It should get error, CELLPHONE_REQUIRED", async () => {
    await configuredCustomRequest.sendFullFeaturedRequest(
      { ...data, countryCode: "", countryName: "", phoneNumber: "" },
      errors.CELLPHONE_REQUIRED
    );
  });
};

module.exports = { cellphone };
