const mongoose = require("mongoose");
const { getEnvironment } = require("~/functions/utilities/utils");
const { environmentsKey } = require("~/variables/constants/environmentsKey");

const MONGO_URI =
  getEnvironment(environmentsKey.NODE_ENV) === "production"
    ? getEnvironment(environmentsKey.MONGO_URI_ATLAS)
    : getEnvironment(environmentsKey.MONGO_URI_LOCAL);

const connectDatabase = async () => {
  try {
    const database = await mongoose.connect(MONGO_URI, {
      // useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
    });
    return { database };
  } catch (error) {
    logger.log(error);
  }
};

module.exports = { connectDatabase };

mongoose.connection.once("connected", () => {
  logger.log(`MongoDB connected: ${mongoose.connection.host}`);
});
