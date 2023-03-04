import { failTestBuilder } from "$/classes/FailTestBuilder";

import { errors } from "@/variables/errors";

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

      const error = response.body.errors[errors.CELLPHONE_REQUIRED.key];

      expect(error.validatedCellphone.countryCode).toBe("");
      expect(error.validatedCellphone.countryName).toBe("");
      expect(error.validatedCellphone.phoneNumber).toBe("");
    }
  );
};

export { cellphoneFailTest };
