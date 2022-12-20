const {
  checkIgnoreApplyMiddlewaresRequirements,
  executeMiddlewares,
  isUrlMatchWithReqUrl,
} = require("@/utilities/utilities");

const applyMiddlewaresByUrl = (url, ...middlewares) => {
  checkIgnoreApplyMiddlewaresRequirements(url, middlewares);

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
