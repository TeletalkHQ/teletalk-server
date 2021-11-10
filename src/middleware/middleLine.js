const morgan = require("morgan");
const { bodyClarify } = require("~/middleware/bodyClarify");
const { errorCollector } = require("~/middleware/errorCollector");

const middleLine = (app, express) => {
	app.use(express.json());
	app.use(bodyClarify);
	app.use(errorCollector);
	app.use(morgan("dev"));
};

module.exports = { middleLine };
