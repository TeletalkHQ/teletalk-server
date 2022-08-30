const mongoose = require("mongoose");

const { appConfigs } = require("@/classes/AppConfigs");

const { errorThrower } = require("@/functions/utilities/utils");

const databaseConnector = () => {
  try {
    const {
      dbConfigs: { MONGO_URL },
    } = appConfigs.getConfigs();

    const database = mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
    });
    return { database };
  } catch (error) {
    logger.log("databaseConnector catch, error:", error);
    errorThrower(error, error);
  }
};

mongoose.connection.once("connected", () => {
  logger.log(`MongoDB connected: ${mongoose.connection.host}`);
});

module.exports = { databaseConnector };
