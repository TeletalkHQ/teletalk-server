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
  if (error?.reason) return error;

  logger.dir(logger.levels.error, { unknownError: error }, { depth: 10 });

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
