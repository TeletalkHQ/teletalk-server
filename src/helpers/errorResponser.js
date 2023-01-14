const { trier } = require("utility-store/src/classes/Trier");

const { errors } = require("@/variables/errors");

const errorResponser = (res = expressResponse) => {
  trier(errorResponser.name).try(tryBlock, res).catch(catchBlock, res).run();
};

const tryBlock = (res) => {
  const { statusCode, ...errors } = res.errors;

  res.status(statusCode || 500).json({ errors });
};

const catchBlock = (error, res) => {
  logger.redBright("CRITICAL ERROR!!!").error();
  logger.error(error);

  const critError = errors.SERVER_CRITICAL_ERROR;
  res.status(critError.statusCode).json({ errors: critError });
};

module.exports = { errorResponser };
