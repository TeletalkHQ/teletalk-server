const { customTypeof } = require("utility-store/src/classes/CustomTypeof");
const { trier } = require("utility-store/src/classes/Trier");

const { fixResponseErrorObject } = require("@/functions/utilities/utilities");

const { errors } = require("@/variables/errors/errors");

const tryToCollectError = (errorObject) => {
  const errorToSend = customTypeof.isObject(errorObject)
    ? errorObject
    : errors.UNKNOWN_ERROR;
  return errorToSend;
};

const executeIfNoError = (errorToSend, res) => {
  res.errors = fixResponseErrorObject(errorToSend);
};

const catchCollectError = (_error, res) => {
  res.errors = errors.UNKNOWN_ERROR;
  res.errorResponser();
};

const errorCollector = (res, errorObject) => {
  trier(errorCollector.name)
    .try(tryToCollectError, errorObject)
    .executeIfNoError(executeIfNoError, res)
    .catch(catchCollectError, res);
};

module.exports = { errorCollector };
