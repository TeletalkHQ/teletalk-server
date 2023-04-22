import { E2eFailTestInitializer } from "$/types";

import { helpers } from "$/helpers";

import { ERRORS } from "@/variables";

const selfStuffE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  it(
    helpers.createFailTestMessage(
      ERRORS.SELF_STUFF,
      configuredRequester.getEventName()
    ),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(
        data,
        ERRORS.SELF_STUFF
      );
    }
  );
};

export { selfStuffE2eFailTestInitializer };
