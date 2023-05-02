import { E2eFailTestInitializer } from "$/types";

import { helpers } from "$/helpers";

import { errors } from "@/variables";

const selfStuffE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  it(
    helpers.createFailTestMessage(
      errors.selfStuff,
      configuredRequester.getEventName()
    ),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(data, errors.selfStuff);
    }
  );
};

export { selfStuffE2eFailTestInitializer };
