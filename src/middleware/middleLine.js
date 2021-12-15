const path = require("path");

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
// const prettyError = require("pretty-error");
const serveFavicon = require("serve-favicon");

const { bodyClarify } = require("~/middleware/bodyClarify");
const { errorCollector } = require("~/middleware/errorCollector");
const { errorResponser } = require("~/middleware/errorResponser");

const middleLine = ({ app, express }) => {
	// prettyError.start();

	app.use((req, res, next) => {
		console.log("Console cleared");
		next();
	});

	//* Pretty error makes nodeJS error pretty in console, use it before express call

	app.use(cors());
	app.use(helmet());
	app.use(morgan("dev"));
	app.use(express.json());

	app.use(bodyClarify);

	app.use((req, res, next) => {
		res.errors = {
			categorized: [],
			categorizedLength: 0,
			server: [],
			serverLength: 0,
			statusCode: 400,
			uncategorized: [],
			uncategorizedLength: 0,
		};

		res.errorCollector = ({ data }) => {
			errorCollector({ req, res, next, data });
		};

		next();
	});

	app.use((req, res, next) => {
		res.errorResponser = () => {
			errorResponser(req, res, next);
		};

		next();
	});

	app.use(serveFavicon(path.join("~/../public/appFavicon/favicon.ico")));

	app.use((req, res, next) => {
		// logger.bgBlue({ text: "Request arrived" }).bgCyan(req.url).log();

		next();
	});
};

module.exports = { middleLine };
