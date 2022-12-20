const {
  integrationHelpersFailCollection,
} = require("$/tests/integration/helpers/fail");
const {
  integrationHelpersSuccessCollection,
} = require("$/tests/integration/helpers/success");

const integrationHelpersCollection = {
  fail: integrationHelpersFailCollection,
  success: integrationHelpersSuccessCollection,
};

module.exports = { integrationHelpersCollection };
