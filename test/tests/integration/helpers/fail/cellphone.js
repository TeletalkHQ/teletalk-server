const { expect } = require("chai");

const { failTestBuilder } = require("$/classes/FailTestBuilder");

const { errors } = require("@/variables/errors");

const cellphoneFailTest = (configuredRequester, data = {}) => {
  it(
    failTestBuilder
      .create()
      .createTestMessage(
        errors.CELLPHONE_REQUIRED,
        configuredRequester.getRoute()
      ),
    async () => {
      const response = await configuredRequester.sendFullFeaturedRequest(
        { ...data, countryCode: "", countryName: "", phoneNumber: "" },
        errors.CELLPHONE_REQUIRED
      );

      const error = response.body.errors[errors.CELLPHONE_REQUIRED.errorKey];

      expect(error.validatedCellphone.countryCode).to.be.equal("");
      expect(error.validatedCellphone.countryName).to.be.equal("");
      expect(error.validatedCellphone.phoneNumber).to.be.equal("");
    }
  );
};

module.exports = { cellphoneFailTest };
