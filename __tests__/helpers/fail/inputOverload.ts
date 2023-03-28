import { randomMaker } from "utility-store";

import { FailTestExecutor } from "$/types";

import { utilities } from "$/utilities";

import { errors } from "@/variables/errors";

const inputOverloadFailTest: FailTestExecutor = (
  configuredRequester,
  data = {}
) => {
  it(
    utilities.createFailTestMessage(
      errors.INPUT_FIELDS_OVERLOAD,
      configuredRequester.getRoute()
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

export { inputOverloadFailTest };
