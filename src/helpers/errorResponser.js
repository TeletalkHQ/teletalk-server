const { trier } = require("utility-store/src/classes/Trier");

const { crashServer } = require("@/utilities/utilities");

const tryToResponseToError = (res) => {
  const { statusCode, ...errors } = res.errors;

  res.status(statusCode || 500).json({ errors, statusCode });
};

const catchResponseToError = (error) => {
  logger.redBright("CRITICAL ERROR!!!").error();
  logger.error(error);
  //TODO: Response critical error
  crashServer();
};

const errorResponser = (res = expressResponse) => {
  trier(errorResponser.name)
    .try(tryToResponseToError, res)
    .catch(catchResponseToError, res)
    .run();
};

module.exports = { errorResponser };
