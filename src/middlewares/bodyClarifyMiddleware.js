const { objectClarify } = require("@/functions/utilities/objectClarify");
const { errorThrower } = require("@/functions/utilities/utils");

/**
 * @param {object} req
 * @param {object} res
 * @param {function} next
 *
 * @return req.body without undefined values
 */
const bodyClarifyMiddleware = (req, _, next) => {
  try {
    req.body = objectClarify(req.body);

    next();
    return { done: true };
  } catch (error) {
    logger.log("bodyClarifyMiddleware catch", error);
    errorThrower(error, error);
    return { done: false };
  }
};

module.exports = { bodyClarifyMiddleware };
