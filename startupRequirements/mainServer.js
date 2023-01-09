const { appConfigs } = require("@/classes/AppConfigs");
const { temporaryClients } = require("@/classes/TemporaryClients");

const { mongodbConnector, redisConnector } = require("@/database/connectors");

const mainServer = async () => {
  await appConfigs.runConfigs();

  const redisClient = await redisConnector();
  await temporaryClients.initializeClients(redisClient);

  mongodbConnector();
};

module.exports = { mainServer };
