const mongoose = require("mongoose");

const { MONGO_URL } = require("~/configs/appConfigs");

const connectDatabase = async () => {
  try {
    const database = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
    });
    return { database };
  } catch (error) {
    logger.log("connectDatabase catch, error:", error);
    throw error;
  }
};

mongoose.connection.once("connected", () => {
  logger.log(`MongoDB connected: ${mongoose.connection.host}`);
});

module.exports = { connectDatabase };
