const {
  ENVIRONMENT_KEYS,
  ENVIRONMENT_VALUES,
} = require("~/variables/constants/environmentInitialValues");
const { userRoutes } = require("~/variables/routes/userRoutes");
const { errorThrower } = require("~/functions/utilities/utilsNoDeps");

const getStatusCodeFromRoute = (route) => {
  try {
    const statusCode = route?.properties?.method || route?.method;

    errorThrower(!statusCode, "You need to pass correct route object");

    return statusCode;
  } catch (error) {
    logger.log("getStatusCodeFromRoute catch, error:", error);
  }
};

const getMethodFromRoute = (route) => {
  try {
    const method = route?.properties?.method;

    errorThrower(!method, "You need to pass correct route object");

    return method;
  } catch (error) {
    logger.log("getMethodFromRoute catch, error:", error);
  }
};

const isEqualWithTargetCellphone = (cellphone, targetCell) => {
  if (
    cellphone.phoneNumber === targetCell.phoneNumber &&
    cellphone.countryCode === targetCell.countryCode &&
    cellphone.countryName === targetCell.countryName
  ) {
    return true;
  }

  return false;
};

const skipParams = (count) => {
  return Array.from({ length: count });
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

const getTokenFromRequest = (request) => {
  const NODE_ENV = getEnvironment(ENVIRONMENT_KEYS.NODE_ENV);

  if (NODE_ENV === ENVIRONMENT_VALUES.NODE_ENV.test) {
    logger.log(request.url);
    if (
      request.url.includes(
        userRoutes.properties.verifySignInNormal.properties.url
      )
    ) {
      return getEnvironment(ENVIRONMENT_KEYS.TEST_VERIFY_TOKEN);
    }

    return getEnvironment(ENVIRONMENT_KEYS.TEST_MAIN_TOKEN);
  }
  return request.headers.authorization?.split("Bearer ")[1];
};

module.exports = {
  getAllEnvironments,
  getEnvironment,
  getMethodFromRoute,
  getStatusCodeFromRoute,
  getTestToken,
  getTokenFromRequest,
  ignoreMiddlewaresByUrl,
  isEqualWithTargetCellphone,
  setEnvironment,
  setTestToken,
  skipParams,
  versionCalculator,
};

// const mongoose = require("mongoose");

// function NoCastString(key, options) {
// 	mongoose.SchemaType.call(this, key, options, "NoCastString");
// }
// NoCastString.prototype = Object.create(mongoose.SchemaType.prototype);

// NoCastString.prototype.cast = function (str) {
// 	if (typeof str !== "string") {
// 		throw new Error(`NoCastString: ${str} is not a string`);
// 	}
// 	return str;
// };

// mongoose.Schema.Types.NoCastString = NoCastString;
