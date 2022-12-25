const {
  inputMissingFailTest,
} = require("$/tests/integration/helpers/fail/inputMissing");
const {
  inputOverloadFailTest,
} = require("$/tests/integration/helpers/fail/inputOverload");

const inputFailTest = (configuredRequest, data) => {
  inputMissingFailTest(configuredRequest, data);
  inputOverloadFailTest(configuredRequest, data);
};

module.exports = { inputFailTest };
