import { randomMaker } from "utility-store";

import { helpers } from "$/helpers";

import { E2eFailTestInitializer } from "$/types";

import { errors } from "~/variables";

const inputOverloadE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data = {}
) => {
  it(
    helpers.createFailTestMessage(
      errors.inputFieldsOverload,
      configuredRequester.getEventName()
    ),
    async () => {
      const copyData = { ...data };
      const randomKey = randomMaker.string(8);
      const randomValue = randomMaker.string(8);
      (copyData as any)[randomKey] = randomValue;
      await configuredRequester.sendFullFeaturedRequest(
        copyData,
        errors.inputFieldsOverload,
        {
          shouldFilterRequestData: false,
        }
      );
    }
  );
};

export { inputOverloadE2eFailTestInitializer };
