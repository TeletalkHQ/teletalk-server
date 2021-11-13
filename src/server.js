//* No more need attention to make absolute path
require("module-alias/register");

const path = require("path");
const express = require("express");

const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");
// const serveFavicon = require("serve-favicon");

const prettyError = require("pretty-error");

const { connectDB } = require("~/config/database/connectDB");

const { lifeLine } = require("~/route/lifeLine");

const { bodyClarify } = require("~/middleware/bodyClarify");

const { errorCollector } = require("~/middleware/errorCollector");
const { errorResponser } = require("./middleware/errorResponser");

dotenv.config({ path: "./src/config/environment/main.env" });

//* Connect to database =>
connectDB();

const app = express();

//* Pretty error makes nodeJS error pretty in console, use it before express call
prettyError.start();

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
// app.use(serveFavicon(path.join(__dirname, "../", "public")));

app.use(bodyClarify);
app.use(errorCollector);
app.use((req, res, next) => {
	res.errorResponser = (statusCode) =>
		errorResponser({ req, res, next, statusCode });
	next();
});

//* Your statics is here =>
app.use(express.static(path.join(__dirname, "public")));

//* All stuff for response to routes is in lifeLine =>
app.use(lifeLine);

const { PORT, NODE_ENV: MODE } = process.env;

const serverListenerCB = () => {
	console.log(`Server is running in ${MODE} mode on port ${PORT}`);
};

//* Control your error here =>

const server = app.listen(PORT, serverListenerCB);

console.log(server);
