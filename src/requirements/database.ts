const { appConfigs } = require("@/classes/AppConfigs");
const { temporaryClients } = require("@/classes/TemporaryClients");

const { mongodbConnector, redisConnector } = require("@/database/connectors");

const databaseRequirements = async () => {
  await appConfigs.runConfigs();
  const redisClient = await redisConnector();
  await temporaryClients.initialize(redisClient);
  await mongodbConnector();
};

module.exports = { databaseRequirements };
