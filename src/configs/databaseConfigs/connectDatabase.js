const mongoose = require("mongoose");

const { MONGO_URI } = require("~/configs/appConfigs/appConfigs");

const connectDatabase = async () => {
  try {
    const database = await mongoose.connect(MONGO_URI, {
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
