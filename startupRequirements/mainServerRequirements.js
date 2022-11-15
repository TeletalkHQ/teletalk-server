const { appConfigs } = require("@/classes/AppConfigs");
const { stateManager } = require("@/classes/StateManager");

const {
  mongodbConnector,
  redisConnector,
} = require("~/src/database/connectors");

const mainServerRequirements = async () => {
  await appConfigs.runConfigs();

  const redisClient = redisConnector();
  stateManager.setStorage(redisClient);
  await stateManager.initializeStates();

  mongodbConnector();
};

module.exports = { mainServerRequirements };
