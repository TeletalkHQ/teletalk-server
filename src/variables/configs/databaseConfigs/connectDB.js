const mongoose = require("mongoose");

const MONGO_URI =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_URI_ATLAS
    : process.env.MONGO_URI_LOCAL;

const connectDB = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI, {
      // useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepAlive: true,
    });
    return { db };
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = { connectDB };

mongoose.connection.once("connected", () => {
  console.log(`MongoDB connected: ${mongoose.connection.host}`);
});
