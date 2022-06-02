const errorThrower = (condition, error) => {
  if (condition) {
    //TODO Write errors into log file;
    if (customTypeof(error).type.function) throw error();

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

const getMethodFromRoute = (route) => {
  try {
    const method = route?.method;

    errorThrower(!method, "You need to pass correct route object");

    return method;
  } catch (error) {
    logger.log("getMethodFromRoute catch, error:", error);
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

const isFunction = (...items) => {
  return items.every((i) => customTypeof(i).type.function);
};
const isArray = (value) => Array.isArray(value);
const isNull = (value) => value === null;

const customTypeof = (value) => {
  let type = {
    array: false,
    nan: false,
    null: false,
    function: false,
    string: false,
    number: false,
    object: false,
    boolean: false,
    undefined: false,
  };

  if (isNaN(value)) type.nan = true;

  if (isArray(value)) {
    type.array = true;
  } else if (isNull(value)) {
    type.null = true;
  } else {
    type[typeof value] = true;
  }

  return { type, truthy: isNull(value) ? false : !!value };
};

const getValidatorErrorTypes = (errorArray) => {
  const validatorErrorTypes = {
    array: false,
    arrayContains: false,
    arrayEmpty: false,
    arrayEnum: false,
    arrayLength: false,
    arrayMax: false,
    arrayMin: false,
    arrayUnique: false,
    boolean: false,
    date: false,
    dateMax: false,
    dateMin: false,
    email: false,
    emailEmpty: false,
    emailMax: false,
    emailMin: false,
    enumValue: false,
    equalField: false,
    equalValue: false,
    forbidden: false,
    function: false,
    luhn: false,
    mac: false,
    number: false,
    numberEqual: false,
    numberInteger: false,
    numberMax: false,
    numberMin: false,
    numberNegative: false,
    numberNotEqual: false,
    numberPositive: false,
    object: false,
    objectMaxProps: false,
    objectMinProps: false,
    objectStrict: false,
    string: false,
    stringAlpha: false,
    stringAlphadash: false,
    stringAlphanum: false,
    stringBase64: false,
    stringContains: false,
    stringEmpty: false,
    stringEnum: false,
    stringHex: false,
    stringLength: false,
    stringMax: false,
    stringMin: false,
    stringNumeric: false,
    stringPattern: false,
    stringSingleLine: false,
    tuple: false,
    tupleEmpty: false,
    tupleLength: false,
    url: false,
    uuid: false,
    uuidVersion: false,
  };

  errorArray.forEach((error) => {
    validatorErrorTypes[error.type] = true;
  });

  return validatorErrorTypes;
};

const findByProp = (items = [], value, prop) =>
  items.find((item) => item[prop] === value);

const getHostFromRequest = (request) => request.get("host");

const isUrlMatchWithReqUrl = (url, reqUrl) =>
  (isArray(url) && url.some((u) => u === reqUrl)) || url === reqUrl;

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
  const tempArray = [];

  for (const key in object) {
    tempArray.push(object[key].version);
  }

  return tempArray;
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

const getTokenFromRequest = (request) => {
  const { authorization, Authorization } = request.headers;

  return (authorization || Authorization)?.split("Bearer ")[1];
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

const concatBaseUrlWithUrl = (baseUrlObject, routeObject) =>
  `${baseUrlObject.url}${routeObject.url}`;

const filterObject = (object, filterFields) => {
  const filteredObject = {};

  for (const key in filterFields) {
    if (customTypeof(filterFields[key]).type.object) {
      filteredObject[key] = filterObject(object[key], filterFields[key]);
      continue;
    }

    filteredObject[key] = object[key];
  }

  return filteredObject;
};

module.exports = {
  concatBaseUrlWithUrl,
  convertStringArrayToNumberArray,
  crashServer,
  crashServerWithCondition,
  customTypeof,
  errorThrower,
  extractVersions,
  filterObject,
  findByProp,
  getErrorObject,
  getHostFromRequest,
  getMethodFromRoute,
  getObjectLength,
  getTokenFromRequest,
  getValidatorErrorTypes,
  isArray,
  isEqualWithTargetCellphone,
  isFunction,
  isNull,
  isUrlMatchWithReqUrl,
  objectInitializer,
  skipParams,
  versionCalculator,
};

// const extractFromInfo = (object) => {
//   const tempObject = {};

//   for (const key in object) {
//     tempObject[key] = object[key].info;
//   }

//   return tempObject;
// };

// const mongoose = require("mongoose");

// function NoCastString(key, options) {
// 	mongoose.SchemaType.call(this, key, options, "NoCastString");
// }
// NoCastString.prototype = Object.create(mongoose.SchemaType.prototype);

// NoCastString.prototype.cast = function (str) {
// 	if (customTypeof(str) !== "string") {
// 		throw new Error(`NoCastString: ${str} is not a string`);
// 	}
// 	return str;
// };

// mongoose.Schema.Types.NoCastString = NoCastString;
