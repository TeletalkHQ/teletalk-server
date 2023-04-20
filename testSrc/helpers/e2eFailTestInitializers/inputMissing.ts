import { E2eFailTestInitializer } from "$/types";

import { helpers } from "$/helpers";

import { errors } from "@/variables/errors";

const inputMissingE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data = {}
) => {
  it(
    helpers.createFailTestMessage(
      errors.INPUT_FIELDS_MISSING,
      configuredRequester.getRoute()
    ),
    async () => {
      const copyData = { ...data };
      const firstKey = Object.keys(copyData).at(0) as string;
      delete (copyData as any)[firstKey];
      await configuredRequester.sendFullFeaturedRequest(
        copyData,
        errors.INPUT_FIELDS_MISSING,
        {
          shouldFilterRequestData: false,
        }
      );
    }
  );
};

export { inputMissingE2eFailTestInitializer };
