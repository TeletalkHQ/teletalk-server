const { trier } = require("utility-store/src/classes/Trier");

const { crashServer } = require("@/functions/utilities/utilities");

const tryToResponseToError = (res) => {
  const { statusCode, ...errors } = res.errors;

  res.status(statusCode || 500).json({ errors, statusCode });
};

const catchResponseToError = () => {
  logger.redBright("CRITICAL ERROR!!!").log();
  crashServer();
};

const errorResponser = (res = expressResponse) => {
  trier(errorResponser.name)
    .try(tryToResponseToError, res)
    .catch(catchResponseToError, res);
};

module.exports = { errorResponser };
