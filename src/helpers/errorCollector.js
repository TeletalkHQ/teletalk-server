const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { trier } = require("utility-store/src/classes/Trier");

const { fixResponseErrorObject } = require("@/utilities/utilities");

const { errors } = require("@/variables/errors");

const tryToCollectError = (errorObject) => {
  if (customTypeof.isObject(errorObject) && errorObject.reason)
    return errorObject;

  return {
    ...errors.UNKNOWN_ERROR,
    unknownError: errorObject,
  };
};

const executeIfNoError = (errorToSend, res) => {
  res.errors = fixResponseErrorObject(errorToSend);
};

const catchCollectError = (error, res) => {
  res.errors = { ...errors.UNKNOWN_ERROR, unknownError: error };
  res.errorResponser();
};

const errorCollector = (res, errorObject) => {
  trier(errorCollector.name)
    .try(tryToCollectError, errorObject)
    .executeIfNoError(executeIfNoError, res)
    .catch(catchCollectError, res)
    .run();
};

module.exports = { errorCollector };
