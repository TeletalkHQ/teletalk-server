const lodash = require("lodash");

const {
  ENVIRONMENT_KEYS,
} = require("@/variables/constants/environmentInitialValues");

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

const getCellphone = (object = {}) => {
  return {
    phoneNumber: object.phoneNumber,
    countryCode: object.countryCode,
    countryName: object.countryName,
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

const randomNumber = (length) => {
  var chars = "1234567890";
  var pwd = lodash.sampleSize(chars, length ?? 10);
  return pwd.join("");
};

const validatorErrorFinder = (errors, value, prop = "type") =>
  errors.find((r) => r[prop] === value);

const getHostFromRequest = (request) => request.get("host");

const isUrlShouldIgnore = (url, reqUrl) =>
  (Array.isArray(url) && url.some((u) => u === reqUrl)) || url === reqUrl;

module.exports = {
  errorThrower,
  getAllEnvironments,
  getCellphone,
  getEnvironment,
  getErrorObject,
  getHostFromRequest,
  getMethodFromRoute,
  getValidatorErrorTypes,
  isFunction,
  isUrlShouldIgnore,
  objectInitializer,
  randomNumber,
  randomString,
  setEnvironment,
  skipParams,
  validatorErrorFinder,
  versionCalculator,
};
