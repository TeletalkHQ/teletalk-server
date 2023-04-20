import { E2eFailTestInitializer } from "$/types";

import { helpers } from "$/helpers";

import { errors } from "@/variables/errors";

const selfStuffE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  it(
    helpers.createFailTestMessage(
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
