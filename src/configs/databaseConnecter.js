const mongoose = require("mongoose");

const { errorThrower } = require("@/functions/utilities/utils");

const {
  appConfigs: { MONGO_URL },
} = require("@/configs/appConfigs");

const databaseConnecter = async () => {
  try {
    const database = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
    });
    return { database };
  } catch (error) {
    logger.log("connectDatabase catch, error:", error);
    errorThrower(error, error);
  }
};

mongoose.connection.once("connected", () => {
  logger.log(`MongoDB connected: ${mongoose.connection.host}`);
});

module.exports = { databaseConnecter };
