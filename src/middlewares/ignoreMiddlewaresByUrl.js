const {
  checkIgnoreApplyMiddlewaresRequirements,
  executeMiddlewares,
  isUrlMatchWithReqUrl,
} = require("@/utilities/utilities");

const ignoreMiddlewaresByUrl = (url, ...middlewares) => {
  checkIgnoreApplyMiddlewaresRequirements(url, middlewares);

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

module.exports = { ignoreMiddlewaresByUrl };
