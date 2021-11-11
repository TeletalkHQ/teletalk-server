const {
	authenticationMiddleware,
} = require("~/middleware/authenticationMiddleware");
const { bodyClarify } = require("~/middleware/bodyClarify");
const {
	cellphoneValidatorMiddleware,
} = require("~/middleware/cellphoneValidatorMiddleware");
const { errorManager } = require("~/middleware/errorManager");
const { errorCollector } = require("~/middleware/errorCollector");
const { errorResponser } = require("~/middleware/errorResponser");

module.exports = {
	authenticationMiddleware,
	bodyClarify,
	cellphoneValidatorMiddleware,
	errorCollector,
	errorManager,
	errorResponser,
};
