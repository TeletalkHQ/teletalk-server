import { inputMissingFailTest } from "$/helpers/fail/inputMissing";
import { inputOverloadFailTest } from "$/helpers/fail/inputOverload";

import { FailTestExecutor } from "$/types";

const inputFailTest: FailTestExecutor = (configuredRequest, data) => {
  inputMissingFailTest(configuredRequest, data);
  inputOverloadFailTest(configuredRequest, data);
};

export { inputFailTest };
