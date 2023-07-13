import { errorStore } from "~/classes/ErrorStore";

import { E2eFailTestInitializer } from "@/types";
import { utils } from "@/utils";

export const selfStuffE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  it(
    utils.createFailTestMessage(
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
