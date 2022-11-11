const mongoose = require("mongoose");
const { trier } = require("utility-store/src/classes/Trier");

const { appConfigs } = require("@/classes/AppConfigs");

const tryConnectToDatabase = () => {
  const {
    dbConfigs: { MONGO_URL_WITH_COLLECTION_NAME },
  } = appConfigs.getConfigs();

  const database = mongoose.connect(MONGO_URL_WITH_COLLECTION_NAME, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return { database };
};

const databaseConnector = () => {
  trier(databaseConnector.name).try(tryConnectToDatabase).printAndThrow();
};

mongoose.connection.once("connected", () => {
  logger.info(`MongoDB connected: ${mongoose.connection.host}`);
});

module.exports = { databaseConnector };
