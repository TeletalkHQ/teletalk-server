//* No more need attention to make absolute path
require("module-alias/register");

const path = require("path");
const express = require("express");

const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");
const serveFavicon = require("serve-favicon");

const prettyError = require("pretty-error");

const { connectDB } = require("~/config/database/connectDB");

const { myConsole } = require("./function/utility/myConsole");
global.myConsole = myConsole;
global.logger = myConsole;

const { lifeLine } = require("~/route/lifeLine");

const { bodyClarify } = require("~/middleware/bodyClarify");

const { errorCollector } = require("~/middleware/errorCollector");
const { errorResponser } = require("~/middleware/errorResponser");

dotenv.config({ path: "./src/config/environment/main.env" });

//* Connect to database =>
connectDB();

const app = express();

app.use((req, res, next) => {
	console.log("Console cleared");
	next();
});

//* Pretty error makes nodeJS error pretty in console, use it before express call
prettyError.start();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use(bodyClarify);
app.use(errorCollector);
app.use(errorResponser);

app.use((req, res, next) => {
	logger.bgBlue("Request arrived").bgCyan(req.url);

	next();
});

//* Your statics is here =>
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(serveFavicon(path.join(__dirname, "..", "public", "app_favicon", "favicon.ico")));

//* All stuff for response to routes is in lifeLine =>
app.use(lifeLine);

app.use(errorResponser);

const { PORT, NODE_ENV: MODE } = process.env;

const serverListenerCB = () => {
	console.log(`Server is running in ${MODE} mode on port ${PORT}`);
};

//* Control your error here =>

// const server =
app.listen(PORT, serverListenerCB);
