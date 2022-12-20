const {
  integrationFailTestBuilder,
} = require("$/classes/IntegrationFailTestMaker");
const {
  integrationSuccessTestBuilder,
} = require("$/classes/IntegrationSuccessTestMaker");

const integrationHelpers = {
  createFailTest: integrationFailTestBuilder,
  createSuccessTest: integrationSuccessTestBuilder,
};

module.exports = {
  integrationHelpers,
};
