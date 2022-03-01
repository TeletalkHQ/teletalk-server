const { authDefaultMDW } = require("~/middlewares/authDefaultMDW");
const { bodyClarify } = require("~/middlewares/bodyClarify");

const { cellphoneValidatorMDW } = require("~/middlewares/cellphoneValidatorMDW");
const {
	registerNormalUserValidatorMDW,
} = require("~/middleware/userMiddleware/registerNormalUserValidatorMDW");

const { errorCollector } = require("~/middlewares/errorCollector");
const { errorResponser } = require("~/middlewares/errorResponser");

module.exports = {
	authDefaultMDW,
	bodyClarify,
	cellphoneValidatorMDW,
	errorCollector,
	errorResponser,
	registerNormalUserValidatorMDW,
};
