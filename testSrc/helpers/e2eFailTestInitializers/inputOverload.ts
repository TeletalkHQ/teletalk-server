import { randomMaker } from "utility-store";

import { helpers } from "$/helpers";

import { E2eFailTestInitializer } from "$/types";

import { errors } from "@/variables/errors";

const inputOverloadE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data = {}
) => {
  it(
    helpers.createFailTestMessage(
      errors.INPUT_FIELDS_OVERLOAD,
      configuredRequester.getEventName()
    ),
    async () => {
      const copyData = { ...data };
      const randomKey = randomMaker.string(8);
      const randomValue = randomMaker.string(8);
      (copyData as any)[randomKey] = randomValue;
      await configuredRequester.sendFullFeaturedRequest(
        copyData,
        errors.INPUT_FIELDS_OVERLOAD,
        {
          shouldFilterRequestData: false,
        }
      );
    }
  );
};

export { inputOverloadE2eFailTestInitializer };
