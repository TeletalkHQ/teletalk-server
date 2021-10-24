const mongoose = require("mongoose");

exports.connectDB = async () => {
	try {
		const { connection } = await mongoose.connect(process.env.MONGO_URI, {
			// useFindAndModify: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log(`MongoDB connected: ${connection.host}`);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};
