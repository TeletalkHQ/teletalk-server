const morgan = require("morgan");

const { bodyClarify, errorCollector } = require("~/middleware/indexMiddleware");

const middleLine = (app, express) => {
	app.use(express.json());
	app.use(errorCollector);
	app.use(bodyClarify);
	app.use(morgan("dev"));
};

module.exports = { middleLine };
