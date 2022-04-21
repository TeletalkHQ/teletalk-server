const {
  ENVIRONMENT_KEYS,
} = require("~/variables/constants/environmentInitialValues");

const errorThrower = (condition, error) => {
  if (condition) {
    if (typeof error === "function") throw error();

    throw error;
  }
};

const objectInitializer = (values, props) => {
  try {
    const tempObj = {};

    props.forEach((prop, index) => {
      tempObj[prop] = values[index];
    });

    return tempObj;
  } catch (error) {
    logger.log("objectInitializer catch", error);
  }
};

const versionCalculator = () => {};

const getEnvironment = (envName) => {
  return process.env[envName];
};

const getAllEnvironments = () => {
  const environments = {};

  for (const key in ENVIRONMENT_KEYS) {
    environments[key] = getEnvironment(key);
  }

  return environments;
};

const setEnvironment = (envName, value) => {
  process.env[envName] = value;
};

const getTestToken = () => {
  return getEnvironment("TEST_TOKEN");
};

const setTestToken = (token) => {
  setEnvironment("TEST_TOKEN", token);
};

const getStatusCodeFromRoute = (route) => {
  try {
    const statusCode = route?.properties?.statusCode || route?.statusCode;

    errorThrower(!statusCode, "You need to pass correct route object");

    return statusCode;
  } catch (error) {
    logger.log("getStatusCodeFromRoute catch, error:", error);
  }
};

const getMethodFromRoute = (route) => {
  try {
    const method = route?.properties?.method || route?.method;

    errorThrower(!method, "You need to pass correct route object");

    return method;
  } catch (error) {
    logger.log("getMethodFromRoute catch, error:", error);
  }
};

const isFunction = (...items) => {
  return items.some((i) => typeof i === "function");
};

const ignoreMiddlewaresByUrl = (url, ...middlewares) => {
  try {
    errorThrower(
      typeof url !== "string" && !Array.isArray(url),
      "url must be string or an array"
    );

    errorThrower(
      !middlewares.length,
      "You need to pass at least one middleware"
    );

    return async (req, res, next) => {
      errorThrower(
        !isFunction(res?.json, next),
        "You need to pass this tree item: [req, res, next]"
      );

      if (
        (Array.isArray(url) && url.some((u) => u === req.url)) ||
        url === req.url
      ) {
        return next();
      }

      for await (const md of middlewares) {
        await md(req, res, next);
      }
    };
  } catch (error) {
    logger.log("ignoreMiddlewaresByUrl catch, error:", error);
  }
};

const skipParams = (count) => {
  return Array.from({ length: count });
};

const getErrorObject = (errorObject) => {
  return errorObject.properties;
};

module.exports = {
  errorThrower,
  getAllEnvironments,
  getEnvironment,
  getErrorObject,
  getMethodFromRoute,
  getStatusCodeFromRoute,
  getTestToken,
  ignoreMiddlewaresByUrl,
  objectInitializer,
  setEnvironment,
  setTestToken,
  skipParams,
  versionCalculator,
};
