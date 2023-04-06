import { expect } from "chai";

import { E2eFailTestInitializer } from "$/types";

import { utilities } from "$/utilities";
import { errors } from "@/variables/errors";

const cellphoneE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data = {}
) => {
  const message = utilities.createFailTestMessage(
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

    expect(error.validatedCellphone.countryCode).to.be.equal("");
    expect(error.validatedCellphone.countryName).to.be.equal("");
    expect(error.validatedCellphone.phoneNumber).to.be.equal("");
  });
};

export { cellphoneE2eFailTestInitializer };
