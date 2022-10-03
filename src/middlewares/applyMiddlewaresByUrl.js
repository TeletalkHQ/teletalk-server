const {
  checkExecuteMiddlewaresRequirements,
  executeMiddlewares,
  isUrlMatchWithReqUrl,
} = require("@/functions/utilities/utilities");

const applyMiddlewaresByUrl = (url, ...middlewares) => {
  checkExecuteMiddlewaresRequirements(url, middlewares);

  return async (req, res, next) => {
    if (isUrlMatchWithReqUrl(url, req.url)) {
      return await executeMiddlewares({
        middlewares,
        next,
        req,
        res,
      });
    }

    next();
  };
};

module.exports = { applyMiddlewaresByUrl };
