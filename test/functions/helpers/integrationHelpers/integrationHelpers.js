const {
  IntegrationFailTestMaker,
} = require("$/classes/IntegrationFailTestMaker");
const {
  IntegrationSuccessTestMaker,
} = require("$/classes/IntegrationSuccessTestMaker");

const integrationHelpers = {
  createFailTest: (...args) => new IntegrationFailTestMaker(...args),
  createSuccessTest: (...args) => new IntegrationSuccessTestMaker(...args),
};

module.exports = {
  integrationHelpers,
};
