const dotenv = require("dotenv");

const { connectDB } = require("~/config/database/connectDB");

const serverConfigurations = () => {
	dotenv.config({ path: "./src/config/environment/main.env" });

	//* Connect to database =>
	connectDB();
};

module.exports = { serverConfigurations };
