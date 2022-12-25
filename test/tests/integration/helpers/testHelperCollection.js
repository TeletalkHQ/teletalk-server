const { failCollection } = require("$/tests/integration/helpers/fail");
const { successCollection } = require("$/tests/integration/helpers/success");

const testHelperCollection = {
  fail: failCollection,
  success: successCollection,
};

module.exports = { testHelperCollection };
