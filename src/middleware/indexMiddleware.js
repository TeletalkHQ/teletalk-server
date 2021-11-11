const {
	authenticationMiddleware,
} = require("~/middleware/authenticationMiddleware");
const { bodyClarify } = require("~/middleware/bodyClarify");

const {
	cellphoneValidatorMiddleware,
} = require("~/middleware/cellphoneValidatorMiddleware");
const {
	normalRegisterUserValidatorMiddleware,
} = require("~/middleware/userMiddleware/normalRegisterUserValidatorMiddleware");

const { errorCollector } = require("~/middleware/errorCollector");
const { errorResponser } = require("~/middleware/errorResponser");

module.exports = {
	authenticationMiddleware,
	bodyClarify,
	cellphoneValidatorMiddleware,
	errorCollector,
	errorResponser,
	normalRegisterUserValidatorMiddleware,
};
