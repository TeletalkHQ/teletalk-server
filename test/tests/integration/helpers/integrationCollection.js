const { failCollection } = require("$/tests/integration/helpers/fail");
const { successCollection } = require("$/tests/integration/helpers/success");

const integrationHelpersCollection = {
  fail: failCollection,
  success: successCollection,
};

module.exports = { integrationHelpersCollection };
