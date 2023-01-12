const { errorCollector } = require("@/helpers/errorCollector");
const { errorResponser } = require("@/helpers/errorResponser");

const responseErrorHandlers = (_, res, next) => {
  res.errors = {
    errors: {},
    statusCode: 500,
  };

  res.errorCollector = (error) => {
    errorCollector(res, error);
  };
  res.errorResponser = () => {
    errorResponser(res);
  };

  next();
};

module.exports = { responseErrorHandlers };
