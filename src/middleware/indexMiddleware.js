const { bodyClarify } = require("~/middleware/bodyClarify");
const { errorCollector } = require("~/middleware/errorCollector");

const {
	cellphoneValidatorMiddleware,
} = require("~/middleware/cellphoneValidatorMiddleware");

const { middleLine } = require("~/middleware/middleLine");

module.exports = {
	cellphoneValidatorMiddleware,
	bodyClarify,
	middleLine,
	errorCollector,
};
