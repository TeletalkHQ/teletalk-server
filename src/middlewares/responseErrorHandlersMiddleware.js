const {
  errorCollectorMiddleware,
} = require("@/middlewares/errorCollectorMiddleware");
const {
  errorResponserMiddleware,
} = require("@/middlewares/errorResponserMiddleware");

const responseErrorHandlers = (_, res, next) => {
  res.errors = {
    errors: {},
    statusCode: 500,
  };

  res.errorCollector = (errorObject) => {
    errorCollectorMiddleware(res, errorObject);
  };
  res.errorResponser = () => {
    errorResponserMiddleware(res);
  };

  next();
};

module.exports = { responseErrorHandlers };
