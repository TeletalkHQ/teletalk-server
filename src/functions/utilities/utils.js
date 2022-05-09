const lodash = require("lodash");

const {
  ENVIRONMENT_KEYS,
} = require("@/variables/constants/environmentInitialValues");

const errorThrower = (condition, error) => {
  if (condition) {
    //TODO Write errors into log file;
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

const getEnvironment = (envName) => {
  return process.env[envName];
};

const getAllEnvironments = () => {
  const environments = { ...ENVIRONMENT_KEYS };

  for (const key in ENVIRONMENT_KEYS) {
    environments[key] = getEnvironment(key);
  }

  return environments;
};

const setEnvironment = (envName, value) => {
  process.env[envName] = value;
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

const isFunction = (...items) => {
  return items.every((i) => typeof i === "function");
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

const randomString = (length) => {
  var chars = "abcdefghijklmnopqrstufwxyzABCDEFGHIJKLMNOPQRSTUFWXYZ1234567890";
  var pwd = lodash.sampleSize(chars, length ?? 12);
  return pwd.join("");
};

const randomStringNumber = (length) => {
  var chars = "12345678901234567890123456789012345678901234567890";
  var pwd = lodash.sampleSize(chars, length ?? 10);
  return pwd.join("");
};

const randomCountryCode = () =>
  Math.floor(Math.random() * 100 * Math.random()) +
  Math.floor(Math.random() * 10);

const validatorErrorFinder = (errors, value, prop = "type") =>
  errors.find((r) => r[prop] === value);

const getHostFromRequest = (request) => request.get("host");

const isUrlMatchWithReqUrl = (url, reqUrl) =>
  (Array.isArray(url) && url.some((u) => u === reqUrl)) || url === reqUrl;

const versionCalculator = (versions = []) => {
  let [parentMajor, parentMinor, parentPatch] = returnNumberFromArrayOfString(
    "1.0.0".split(".")
  );

  versions.forEach((v) => {
    const [major, minor, patch] = returnNumberFromArrayOfString(v.split("."));

    parentMajor += major - 1;
    parentMinor += minor;
    parentPatch += patch;
  });

  return `${parentMajor}.${parentMinor}.${parentPatch}`;
};

const returnNumberFromArrayOfString = (items) => items.map((item) => +item);

const extractFromProperties = (object) => {
  const tempObject = {};

  for (const key in object) {
    tempObject[key] = object[key];
  }

  return tempObject;
};

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

module.exports = {
  errorThrower,
  extractFromProperties,
  extractVersions,
  getAllEnvironments,
  getEnvironment,
  getErrorObject,
  getHostFromRequest,
  getMethodFromRoute,
  getTokenFromRequest,
  getValidatorErrorTypes,
  isEqualWithTargetCellphone,
  isFunction,
  isUrlMatchWithReqUrl,
  objectInitializer,
  randomCountryCode,
  randomString,
  randomStringNumber,
  returnNumberFromArrayOfString,
  setEnvironment,
  skipParams,
  validatorErrorFinder,
  versionCalculator,
};

// const extractFromInfo = (object) => {
//   const tempObject = {};

//   for (const key in object) {
//     tempObject[key] = object[key].info;
//   }

//   return tempObject;
// };
