const {
  integrationHelpersFailCollection,
} = require("$/functions/helpers/integrationHelpers/fail");
const {
  integrationHelpersSuccessCollection,
} = require("$/functions/helpers/integrationHelpers/success");

const integrationHelpersCollection = {
  fail: integrationHelpersFailCollection,
  success: integrationHelpersSuccessCollection,
};

module.exports = { integrationHelpersCollection };
