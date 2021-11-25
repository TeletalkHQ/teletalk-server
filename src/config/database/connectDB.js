const mongoose = require("mongoose");

const connectDB = async () => {
	try {
		const db = await mongoose.connect(process.env.MONGO_URI, {
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
