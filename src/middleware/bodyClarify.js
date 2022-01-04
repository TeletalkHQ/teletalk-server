const { objectClarify } = require("~/function/utility/objectClarify");

/**
 *
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 *
 * @return req.body without undefined values
 */
const bodyClarify = (req, res, next) => {
	try {
		const { object } = objectClarify(req.body);
		req.body = object;
		next();
	} catch (error) {
		logger.log("bodyClarify catch", error);
		throw error;
	}
};

module.exports = { bodyClarify };
