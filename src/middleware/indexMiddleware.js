const { authDefaultMDW } = require("~/middleware/authDefaultMDW");
const { bodyClarify } = require("~/middleware/bodyClarify");

const { cellphoneValidatorMDW } = require("~/middleware/cellphoneValidatorMDW");
const {
	registerNormalUserValidatorMDW,
} = require("~/middleware/userMiddleware/registerNormalUserValidatorMDW");

const { errorCollector } = require("~/middleware/errorCollector");
const { errorResponser } = require("~/middleware/errorResponser");

module.exports = {
	authDefaultMDW,
	bodyClarify,
	cellphoneValidatorMDW,
	errorCollector,
	errorResponser,
	registerNormalUserValidatorMDW,
};
