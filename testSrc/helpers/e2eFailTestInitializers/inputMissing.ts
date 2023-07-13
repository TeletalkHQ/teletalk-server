import { errorStore } from "~/classes/ErrorStore";

import { helpers } from "@/helpers";
import { E2eFailTestInitializer } from "@/types";

export const inputMissingE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data
) => {
  it(
    helpers.createFailTestMessage(
      errorStore.find("INPUT_FIELDS_MISSING"),
      configuredRequester.getEventName()
    ),
    async () => {
      const copyData = { ...data };
      const firstKey = Object.keys(copyData).at(0) as string;
      delete (copyData as any)[firstKey];
      await configuredRequester.sendFullFeaturedRequest(
        copyData,
        errorStore.find("INPUT_FIELDS_MISSING"),
        {
          shouldFilterRequestData: false,
        }
      );
    }
  );
};
