import { FailTestExecutor } from "$/types";

import { utilities } from "$/utilities";

import { errors } from "@/variables/errors";

const selfStuffFailTest: FailTestExecutor = (configuredRequester, data) => {
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

export { selfStuffFailTest };
