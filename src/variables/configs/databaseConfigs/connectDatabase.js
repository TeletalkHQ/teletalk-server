const mongoose = require("mongoose");

const MONGO_URI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI_ATLAS
    : process.env.MONGO_URI_ATLAS; //MONGO_URI_LOCAL;

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
    console.log(error);
  }
};

module.exports = { connectDatabase };

mongoose.connection.once("connected", () => {
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
});
