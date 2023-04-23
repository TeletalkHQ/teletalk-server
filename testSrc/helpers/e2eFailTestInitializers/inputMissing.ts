import { E2eFailTestInitializer } from "$/types";

import { helpers } from "$/helpers";

import { ERRORS } from "@/variables";

const inputMissingE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data = {}
) => {
  it(
    helpers.createFailTestMessage(
      ERRORS.INPUT_FIELDS_MISSING,
      configuredRequester.getEventName()
    ),
    async () => {
      const copyData = { ...data };
      const firstKey = Object.keys(copyData).at(0) as string;
      delete (copyData as any)[firstKey];
      await configuredRequester.sendFullFeaturedRequest(
        copyData,
        ERRORS.INPUT_FIELDS_MISSING,
        {
          shouldFilterRequestData: false,
        }
      );
    }
  );
};

export { inputMissingE2eFailTestInitializer };
