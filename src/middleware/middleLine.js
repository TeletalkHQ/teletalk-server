const path = require("path");

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const prettyError = require("pretty-error");
const serveFavicon = require("serve-favicon");

const { bodyClarify } = require("~/middleware/bodyClarify");
const { errorCollector } = require("~/middleware/errorCollector");
const { errorResponser } = require("~/middleware/errorResponser");

//TODO Use try/catch, Use NODE_ENV
const middleLine = ({ server, express }) => {
	//* PrettyError is prettier for nodeJS errors in console.
	prettyError.start();

	server.use(cors());
	server.use(helmet());
	server.use(morgan("dev"));
	server.use(express.json());

	server.use(bodyClarify);

	server.use((req, res, next) => {
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

	server.use((req, res, next) => {
		res.errorResponser = () => {
			errorResponser(req, res, next);
		};

		next();
	});

	server.use(serveFavicon(path.join("~/../public/appFavicon/favicon.ico")));

	server.use((req, res, next) => {
		logger
			.blue("----------------")
			.bgBlue({ text: "Request arrived: " })
			.bgCyan(req.url)
			.blue("----------------")
			.log();

		next();
	});
};

module.exports = { middleLine };
