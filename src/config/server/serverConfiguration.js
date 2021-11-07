const dotenv = require("dotenv");
const prettyError = require("pretty-error");

const { connectDB } = require("~/config/database/connectDB");

const serverConfigurations = () => {
	dotenv.config({ path: "./src/config/environment/main.env" });

	//* Pretty error makes nodeJS error pretty in console, use it before express call
	prettyError.start();

	//* Connect to database =>
	connectDB();
};

module.exports = { serverConfigurations };
