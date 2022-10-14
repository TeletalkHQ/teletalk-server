const {
  integrationHelpersFailCollection,
} = require("$/helpers/integrationHelpers/fail");
const {
  integrationHelpersSuccessCollection,
} = require("$/helpers/integrationHelpers/success");

const integrationHelpersCollection = {
  fail: integrationHelpersFailCollection,
  success: integrationHelpersSuccessCollection,
};

module.exports = { integrationHelpersCollection };
