const {
  excludeVersions,
  errorThrower,
  getErrorObject,
} = require("@/functions/utilities/utils");

const {
  appErrors: { METHOD_NOT_ALLOWED },
} = require("@/variables/errors/appErrors");
const {
  allStuff: {
    routes: { version, ...routes },
  },
} = require("@/variables/others/allStuff");

const routesWithoutVersion = excludeVersions(routes);

const requestMethodCheckerMiddleware = async (req, res, next) => {
  try {
    const routeObject = Object.values(routesWithoutVersion).find(
      (value) => value.fullUrl === req.url
    );

    const requestMethod = req.method.toLowerCase();
    const routeObjectMethod = routeObject.method.toLowerCase();

    errorThrower(requestMethod !== routeObjectMethod, () =>
      getErrorObject(METHOD_NOT_ALLOWED)
    );

    next();

    return { done: true };
  } catch (error) {
    logger.log("requestMethodCheckerMiddleware catch, error:", error);
    res.errorCollector(error);
    res.errorResponser();
    return { done: false };
  }
};

module.exports = { requestMethodCheckerMiddleware };
