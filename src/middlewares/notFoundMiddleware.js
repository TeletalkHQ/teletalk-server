const { getErrorObject } = require("@/functions/utilities/utils");
const {
  appErrors: { NOT_FOUND },
} = require("@/variables/errors/appErrors");

const notFoundMiddleware = (req, res, next) => {
  if (typeof req.routeObject !== "object") {
    req.routeObject = NOT_FOUND;
    res.checkAndResponse(getErrorObject(NOT_FOUND));
  } else {
    next();
  }
};

module.exports = { notFoundMiddleware };
