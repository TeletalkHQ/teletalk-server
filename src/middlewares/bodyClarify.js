const { objectClarify } = require("~/functions/utilities/objectClarify");

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
    console.log(req.body);
    const { cleanObject } = objectClarify({ dirtyObject: req.body });
    req.body = cleanObject;
    next();
  } catch (error) {
    logger.log("bodyClarify catch", error);
    throw error;
  }
};

module.exports = { bodyClarify };
