import { FailTestExecutor } from "$/types";

import { utilities } from "$/utilities";

import { errors } from "@/variables/errors";

const inputMissingFailTest: FailTestExecutor = (
  configuredRequester,
  data = {}
) => {
  it(
    utilities.createFailTestMessage(
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

export { inputMissingFailTest };
