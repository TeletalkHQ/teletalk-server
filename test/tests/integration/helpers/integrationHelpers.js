const {
  integrationFailTestBuilder,
} = require("$/classes/IntegrationFailTestBuilder");
const {
  integrationSuccessTestBuilder,
} = require("$/classes/IntegrationSuccessTestBuilder");

const integrationHelpers = {
  createFailTest: integrationFailTestBuilder,
  createSuccessTest: integrationSuccessTestBuilder,
};

module.exports = {
  integrationHelpers,
};
