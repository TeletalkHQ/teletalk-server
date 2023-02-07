const { loggerHelper } = require("@/utilities/logHelper");

const logSeparator = (_req, _res, next) => {
  loggerHelper.newLine();
  loggerHelper.logSeparator();
  next();
};

module.exports = { logSeparator };
