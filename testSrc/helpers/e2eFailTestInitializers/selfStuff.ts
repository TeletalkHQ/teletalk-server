import { errorStore } from "~/classes/ErrorStore";

import { helpers } from "@/helpers";
import { E2eFailTestInitializer } from "@/types";

export const selfStuffE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  it(
    helpers.createFailTestMessage(
      errorStore.find("SELF_STUFF"),
      configuredRequester.getEventName()
    ),
    async () => {
      await configuredRequester.sendFullFeaturedRequest(
        data,
        errorStore.find("SELF_STUFF")
      );
    }
  );
};
