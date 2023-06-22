import { errors } from "~/variables";

import { helpers } from "@/helpers";
import { E2eFailTestInitializer } from "@/types";

const inputMissingE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data = {}
) => {
  it(
    helpers.createFailTestMessage(
      errors.inputFieldsMissing,
      configuredRequester.getEventName()
    ),
    async () => {
      const copyData = { ...data };
      const firstKey = Object.keys(copyData).at(0) as string;
      delete (copyData as any)[firstKey];
      await configuredRequester.sendFullFeaturedRequest(
        copyData,
        errors.inputFieldsMissing,
        {
          shouldFilterRequestData: false,
        }
      );
    }
  );
};

export { inputMissingE2eFailTestInitializer };
