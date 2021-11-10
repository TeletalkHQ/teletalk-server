const {
	authenticationMiddleware,
} = require("~/middleware/authenticationMiddleware");
const { bodyClarify } = require("~/middleware/bodyClarify");
const {
	cellphoneValidatorMiddleware,
} = require("~/middleware/cellphoneValidatorMiddleware");
const { errorManager } = require("~/middleware/errorManager");
const { errorCollector } = require("~/middleware/errorCollector");

module.exports = {
	authenticationMiddleware,
	bodyClarify,
	cellphoneValidatorMiddleware,
	errorCollector,
	errorManager,
};
