import { inputMissingFailTest } from "$/tests/integration/helpers/fail/inputMissing";
import { inputOverloadFailTest } from "$/tests/integration/helpers/fail/inputOverload";

const inputFailTest = (configuredRequest, data) => {
  inputMissingFailTest(configuredRequest, data);
  inputOverloadFailTest(configuredRequest, data);
};

export { inputFailTest };
