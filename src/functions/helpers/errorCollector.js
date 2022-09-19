const { customTypeof } = require("utility-store/src/classes/CustomTypeof");

const { fixResponseErrorObject } = require("@/functions/utilities/utilities");

const {
  appErrors: { UNKNOWN_ERROR },
} = require("@/variables/errors/appErrors");
const { trier } = require("utility-store/src/classes/Trier");

const tryToCollectError = (errorObject) => {
  const errorToSend = customTypeof.isObject(errorObject)
    ? errorObject
    : UNKNOWN_ERROR;
  return errorToSend;
};

const executeIfNoError = (errorToSend, res) => {
  res.errors = fixResponseErrorObject(errorToSend);
};

const catchCollectError = (_error, res) => {
  res.errors = UNKNOWN_ERROR;
  res.errorResponser();
};

const errorCollector = (res, errorObject) => {
  trier(errorCollector.name)
    .try(tryToCollectError, errorObject)
    .executeIfNoError(executeIfNoError, res)
    .catch(catchCollectError, res);
};

module.exports = { errorCollector };
