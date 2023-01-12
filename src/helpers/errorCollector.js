const { customTypeof } = require("custom-typeof");
const { trier } = require("utility-store/src/classes/Trier");

const { errors } = require("@/variables/errors");

const errorCollector = (res, error) => {
  trier(errorCollector.name)
    .try(tryToCollectError, error)
    .executeIfNoError(executeIfNoError, res)
    .catch(catchCollectError, res)
    .run();
};

const tryToCollectError = (error) => {
  if (customTypeof.isObject(error) && error.reason) return error;

  logger.error("unknownError:::", error);

  return {
    ...errors.UNKNOWN_ERROR,
    unknownError: error,
  };
};

const executeIfNoError = (errorToSend, res) => {
  res.errors = fixResponseError(errorToSend);
};

const catchCollectError = (error, res) => {
  res.errors = { ...errors.UNKNOWN_ERROR, unknownError: error };
  res.errorResponser();
};

const fixResponseError = (error, extraData = {}, statusCode) => {
  const { errorKey, ...rest } = error;

  return {
    [errorKey]: { ...rest, ...extraData },
    statusCode: statusCode || error.statusCode,
  };
};

module.exports = { errorCollector };
