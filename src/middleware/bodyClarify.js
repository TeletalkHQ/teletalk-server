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
	const cleanBody = objectClarify(req.body);
	req.body = cleanBody;
	next();
};

module.exports = { bodyClarify };
