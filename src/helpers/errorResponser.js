const { trier } = require("utility-store/src/classes/Trier");

const { errors } = require("@/variables/errors");

const tryToResponseToError = (res) => {
  const { statusCode, ...errors } = res.errors;

  res.status(statusCode || 500).json({ errors });
};

const catchResponseToError = (error, res) => {
  logger.redBright("CRITICAL ERROR!!!").error();
  logger.error(error);

  const critError = errors.SERVER_CRITICAL_ERROR;
  res.status(critError.statusCode).json({ errors: critError });
};

const errorResponser = (res = expressResponse) => {
  trier(errorResponser.name)
    .try(tryToResponseToError, res)
    .catch(catchResponseToError, res)
    .run();
};

module.exports = { errorResponser };
