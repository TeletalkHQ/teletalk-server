import { E2eFailTestInitializer } from "@/types";
import { inputMissingE2eFailTestInitializer } from "@/utils/e2eFailTestInitializers/inputMissing";
import { inputOverloadE2eFailTestInitializer } from "@/utils/e2eFailTestInitializers/inputOverload";

export const inputE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequest,
  data
) => {
  inputMissingE2eFailTestInitializer(configuredRequest, data);
  inputOverloadE2eFailTestInitializer(configuredRequest, data);
};
