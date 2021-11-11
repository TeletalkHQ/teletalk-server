//* No more need attention to make absolute path
require("module-alias/register");

const path = require("path");
const express = require("express");

const { lifeLine } = require("~/route/lifeLine");

const dotenv = require("dotenv");
const morgan = require("morgan");
const prettyError = require("pretty-error");

const { connectDB } = require("~/config/database/connectDB");

const { bodyClarify } = require("~/middleware/bodyClarify");

const { errorCollector } = require("~/middleware/errorCollector");
const { errorManager } = require("~/middleware/errorManager");

dotenv.config({ path: "./src/config/environment/main.env" });

//* Connect to database =>
connectDB();

//* Pretty error makes nodeJS error pretty in console, use it before express call
prettyError.start();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(bodyClarify);
app.use(errorCollector);

//* MiddleLine contains middlewares and some configurations
// require("~/other/middleLine");

//* Your statics is here =>
app.use(express.static(path.join(__dirname, "public")));

//* All routers is in lifeLine =>
app.use(lifeLine);

app.use(errorManager);

const { PORT, NODE_ENV: MODE } = process.env;

const serverListenerCB = () => {
	console.log(`Server is running in ${MODE} mode on port ${PORT}`);
};

//* Control your error here =>

app.listen(PORT, serverListenerCB);

// const {
// 	contactValidator,
// } = require("./validator/userPartValidator/contactValidator");

// console.log(contactValidator({ contact: ["sss", "sss"] }));
// myConsole.cyan("cyan").bgYellow("bgYellow", "black").blue("blue").log();
