const { customTypeof } = require("@/classes/CustomTypeof");

const errorThrower = (condition, error) => {
  if (condition) {
    //TODO Write errors into log file;
    if (customTypeof.check(error).type.function) throw error();

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
    logger.log("objectInitializer catch, error:", error);
  }
};

const skipParams = (count) => {
  return Array.from({ length: count });
};

const getErrorObject = (errorObject, extraData = {}, statusCode) => {
  const { errorKey, ...error } = errorObject;

  return {
    [errorKey]: { ...error, ...extraData },
    statusCode: statusCode || errorObject.statusCode,
  };
};

const objectClarify = (dirtyObject = {}) => {
  const cleanObject = {};

  Object.entries(dirtyObject)?.forEach(([key, value]) => {
    if (!customTypeof.check(value).type.undefined) {
      const prop = dirtyObject[key];
      if (customTypeof.check(prop).type.object) {
        cleanObject[key] = objectClarify(prop);

        return;
      }

      cleanObject[key] = value;
    }
  });

  return cleanObject;
};

const getHostFromRequest = (request) => request.get("host");

const isUrlMatchWithReqUrl = (url, reqUrl) =>
  (customTypeof.check(url).type.array && url.some((u) => u === reqUrl)) ||
  url === reqUrl;

const versionCalculator = (versions = []) => {
  let [parentMajor, parentMinor, parentPatch] = convertStringArrayToNumberArray(
    "1.0.0".split(".")
  );

  versions.forEach((v) => {
    const [major, minor, patch] = convertStringArrayToNumberArray(v.split("."));

    parentMajor += major - 1;
    parentMinor += minor;
    parentPatch += patch;
  });

  return `${parentMajor}.${parentMinor}.${parentPatch}`;
};

const convertStringArrayToNumberArray = (items) => items.map((item) => +item);

const extractVersions = (object) => {
  return Object.keys(object).map((key) => object[key].version);
};

const isDataHasEqualityWithTargetCellphone = (data, targetCellphone) => {
  if (
    data.phoneNumber === targetCellphone.phoneNumber &&
    data.countryCode === targetCellphone.countryCode &&
    data.countryName === targetCellphone.countryName
  ) {
    return true;
  }

  return false;
};

const getObjectLength = (object) => Object.keys(object).length;

const crashServer = (message) => {
  logger.bgRed(message).log();
  process.exit(1);
};

const crashServerWithCondition = (condition, errorObject) => {
  if (condition) {
    crashServer(
      errorObject.reason || errorObject.errorKey || errorObject.message
    );
  }
};

const excludeVersions = (object) => {
  const tempObject = {};

  for (const key in object) {
    const { version, ...childObject } = object[key];

    tempObject[key] = childObject;
  }

  return tempObject;
};

const concatBaseUrlWithUrl = (baseUrl, routeUrl) => `${baseUrl}${routeUrl}`;

const filterObject = (object, filterFields) => {
  const filteredObject = {};

  for (const key in filterFields) {
    if (customTypeof.check(filterFields[key]).type.object) {
      filteredObject[key] = filterObject(object[key], filterFields[key]);
      continue;
    }

    filteredObject[key] = object[key];
  }

  return filteredObject;
};

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

const printCatchError = (functionName, error) => {
  logger.log(`${functionName} catch, error: ${error}`);
};

module.exports = {
  addFullUrlToRouteObjects,
  concatBaseUrlWithUrl,
  convertStringArrayToNumberArray,
  crashServer,
  crashServerWithCondition,
  errorThrower,
  excludeVersions,
  extractVersions,
  filterObject,
  getErrorObject,
  getHostFromRequest,
  getObjectLength,
  isDataHasEqualityWithTargetCellphone,
  isUrlMatchWithReqUrl,
  objectClarify,
  objectInitializer,
  printCatchError,
  skipParams,
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
