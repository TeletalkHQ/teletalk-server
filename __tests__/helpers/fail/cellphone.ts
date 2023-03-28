import { expect } from "chai";

import { FailTestExecutor } from "$/types";

import { errors } from "@/variables/errors";
import { utilities } from "$/utilities";

const cellphoneFailTest: FailTestExecutor = (
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

export { cellphoneFailTest };
