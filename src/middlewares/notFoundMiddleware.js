const { getErrorObject, customTypeof } = require("@/functions/utilities/utils");
const {
  appErrors: { NOT_FOUND },
} = require("@/variables/errors/appErrors");

const notFoundMiddleware = (req, res, next) => {
  if (!customTypeof(req.routeObject).type.object) {
    req.routeObject = NOT_FOUND;
    res.sendJsonResponse(getErrorObject(NOT_FOUND));
  } else {
    next();
  }
};

module.exports = { notFoundMiddleware };
