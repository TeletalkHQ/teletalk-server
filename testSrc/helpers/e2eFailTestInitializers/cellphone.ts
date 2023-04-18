import chai from "chai";

import { helpers } from "$/helpers";

import { E2eFailTestInitializer } from "$/types";

import { errors } from "@/variables/errors";

const cellphoneE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data = {}
) => {
  const message = helpers.createFailTestMessage(
    errors.CELLPHONE_REQUIRED,
    configuredRequester.getRoute()
  );

  it(message, async () => {
    const response = await configuredRequester.sendFullFeaturedRequest(
      { ...data, countryCode: "", countryName: "", phoneNumber: "" },
      errors.CELLPHONE_REQUIRED
    );

    const error = response.data.errors?.[errors.CELLPHONE_REQUIRED.key];
    if (!error) throw "Errors is not defined";

    chai.expect(error.validatedCellphone.countryCode).to.be.equal("");
    chai.expect(error.validatedCellphone.countryName).to.be.equal("");
    chai.expect(error.validatedCellphone.phoneNumber).to.be.equal("");
  });
};

export { cellphoneE2eFailTestInitializer };
