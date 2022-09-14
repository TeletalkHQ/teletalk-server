const {
  checkApplyIgnoreMiddlewareStartupConditions,
  executeMiddlewares,
  isUrlMatchWithReqUrl,
} = require("@/functions/utilities/utilities");

const ignoreMiddlewaresByUrlMiddleware = (url, ...middlewares) => {
  checkApplyIgnoreMiddlewareStartupConditions(url, middlewares);

  return async (req, res, next) => {
    if (isUrlMatchWithReqUrl(url, req.url)) {
      return next();
    }

    return await executeMiddlewares({
      middlewares,
      next,
      req,
      res,
    });
  };
};

module.exports = { ignoreMiddlewaresByUrlMiddleware };
