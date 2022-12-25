const { expect } = require("chai");

const { errors } = require("@/variables/errors");

const cellphoneFailTest = (configuredCustomRequest, data = {}) => {
  it("should get error: CELLPHONE_REQUIRED", async () => {
    const response = await configuredCustomRequest.sendFullFeaturedRequest(
      { ...data, countryCode: "", countryName: "", phoneNumber: "" },
      errors.CELLPHONE_REQUIRED
    );

    const error = response.body.errors[errors.CELLPHONE_REQUIRED.errorKey];

    expect(error.validatedCellphone.countryCode).to.be.equal("");
    expect(error.validatedCellphone.countryName).to.be.equal("");
    expect(error.validatedCellphone.phoneNumber).to.be.equal("");
  });
};

module.exports = { cellphoneFailTest };
