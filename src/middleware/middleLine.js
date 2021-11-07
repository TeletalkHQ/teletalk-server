const { bodyClarify } = require("~/middleware/bodyClarify");
const morgan = require("morgan");

const middleLine = (app, express) => {
	app.use(express.json());

	app.use(bodyClarify);
	app.use(morgan("dev"));
};

module.exports = { middleLine };
