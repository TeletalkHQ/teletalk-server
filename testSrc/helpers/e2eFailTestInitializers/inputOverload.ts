import { randomMaker } from "utility-store";

import { errors } from "~/variables";

import { helpers } from "@/helpers";
import { E2eFailTestInitializer } from "@/types";

const inputOverloadE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  const message = helpers.createFailTestMessage(
    errors.inputFieldsOverload,
    configuredRequester.getEventName()
  );

  it(message, async () => {
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
  });
};

export { inputOverloadE2eFailTestInitializer };
