const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const {
  objectUtilities,
} = require("utility-store/src/classes/ObjectUtilities");

const errorThrower = (condition, error) => {
  if (condition) {
    if (customTypeof.isFunction(error)) throw error();
    throw error;
  }
};

const fixResponseErrorObject = (errorObject, extraData = {}, statusCode) => {
  const { errorKey, ...error } = errorObject;

  return {
    [errorKey]: { ...error, ...extraData },
    statusCode: statusCode || errorObject.statusCode,
  };
};

const getHostFromRequest = (request) => request.get("host");

const isUrlMatchWithReqUrl = (url, reqUrl) =>
  (customTypeof.isArray(url) && url.some((u) => u === reqUrl)) ||
  url === reqUrl;

const convertStringArrayToNumberArray = (items) => items.map((item) => +item);
const concatVersions = (parentMajor, parentMinor, parentPatch) =>
  `${parentMajor}.${parentMinor}.${parentPatch}`;
const versionCalculator = (versions = []) => {
  const { parentMajor, parentMinor, parentPatch } = versions.reduce(
    (previousValue, currentValue) => {
      const { parentMajor, parentMinor, parentPatch } = previousValue;
      const [major, minor, patch] = convertStringArrayToNumberArray(
        currentValue.split(".")
      );

      return {
        parentMajor: parentMajor + major - 1,
        parentMinor: parentMinor + minor,
        parentPatch: parentPatch + patch,
      };
    },
    {
      parentMajor: 1,
      parentMinor: 0,
      parentPatch: 0,
    }
  );

  return concatVersions(parentMajor, parentMinor, parentPatch);
};

const extractVersions = (object) => {
  return objectUtilities.objectKeys(object).map((key) => object[key].version);
};
const excludeVersions = ({ version, ...object }) => {
  const tempObject = {};
  for (const key in object) {
    const { version, ...rest } = object[key];
    tempObject[key] = rest;
  }
  return tempObject;
};

const crashServer = (message) => {
  logger.bgRed(message, logger.colors.black).error();
  process.exit(1);
};
const crashServerWithCondition = (condition, errorObject) => {
  if (condition) {
    crashServer(
      errorObject.reason || errorObject.errorKey || errorObject.message
    );
  }
};

const concatBaseUrlWithUrl = (baseUrl, routeUrl) => `${baseUrl}${routeUrl}`;
const addFullUrlToRouteObjects = (baseRouteObject, routeObjects) => {
  for (const key in routeObjects) {
    const routeObject = routeObjects[key];

    routeObject.fullUrl = concatBaseUrlWithUrl(
      baseRouteObject.url,
      routeObject.url
    );
  }

  return routeObjects;
};

const executeMiddlewares = async ({ middlewares, next, req, res }) => {
  for await (const md of middlewares) {
    const result = await md(req, res, () => {});

    if (!result?.ok) {
      return;
    }
  }
  return next();
};

const checkExecuteMiddlewaresRequirements = (url, middlewares) => {
  errorThrower(
    customTypeof.isNotString(url) && customTypeof.isNotArray(url),
    "url must be string or an array"
  );
  errorThrower(!middlewares.length, "You need to pass at least one middleware");
};

const regexMaker = (pattern) => new RegExp(pattern);

module.exports = {
  addFullUrlToRouteObjects,
  checkExecuteMiddlewaresRequirements,
  concatBaseUrlWithUrl,
  convertStringArrayToNumberArray,
  crashServer,
  crashServerWithCondition,
  errorThrower,
  excludeVersions,
  executeMiddlewares,
  extractVersions,
  fixResponseErrorObject,
  getHostFromRequest,
  isUrlMatchWithReqUrl,
  regexMaker,
  versionCalculator,
};

// const mongoose = require("mongoose");

// function NoCastString(key, options) {
// 	mongoose.SchemaType.call(this, key, options, "NoCastString");
// }
// NoCastString.prototype = Object.create(mongoose.SchemaType.prototype);

// NoCastString.prototype.cast = function (str) {
// 	if (customTypeof.check(str).type.string) {
// 		throw new Error(`NoCastString: ${str} is not a string`);
// 	}
// 	return str;
// };

// mongoose.Schema.Types.NoCastString = NoCastString;
