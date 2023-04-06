import { E2eFailTestInitializer } from "$/types";

import { utilities } from "$/utilities";

import { errors } from "@/variables/errors";

const selfStuffE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  it(
    utilities.createFailTestMessage(
      errors.SELF_STUFF,
      configuredRequester.getRoute()
    ),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(
        data,
        errors.SELF_STUFF
      );
    }
  );
};

export { selfStuffE2eFailTestInitializer };
