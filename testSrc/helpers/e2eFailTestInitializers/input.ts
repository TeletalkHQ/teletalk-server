import { inputMissingE2eFailTestInitializer } from "$/helpers/e2eFailTestInitializers/inputMissing";
import { inputOverloadE2eFailTestInitializer } from "$/helpers/e2eFailTestInitializers/inputOverload";

import { E2eFailTestInitializer } from "$/types";

const inputE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequest,
  data
) => {
  inputMissingE2eFailTestInitializer(configuredRequest, data);
  inputOverloadE2eFailTestInitializer(configuredRequest, data);
};

export { inputE2eFailTestInitializer };
