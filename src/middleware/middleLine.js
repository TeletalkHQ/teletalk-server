const path = require("path");

const helmet = require("helmet");
const morgan = require("morgan");
const prettyError = require("pretty-error");
const serveFavicon = require("serve-favicon");

const { bodyClarify } = require("~/middleware/bodyClarify");
const { errorCollector } = require("~/middleware/errorCollector");
const { errorResponser } = require("~/middleware/errorResponser");

const middleLine = ({ app, express }) => {
	prettyError.start();

	app.use((req, res, next) => {
		console.log("Console cleared");
		next();
	});

	//* Pretty error makes nodeJS error pretty in console, use it before express call

	app.use(helmet());
	app.use(morgan("dev"));
	app.use(express.json());

	app.use(bodyClarify);
	app.use(errorCollector);
	app.use(errorResponser);

	app.use(serveFavicon(path.join("~/../public/appFavicon/favicon.ico")));

	app.use((req, res, next) => {
		logger.bgBlue({ text: "Request arrived" }).bgCyan(req.url);

		next();
	});
};

module.exports = { middleLine };
