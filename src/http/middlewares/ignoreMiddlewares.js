/* eslint-disable indent */
const {
  checkIgnoreApplyMiddlewaresRequirements,
  executeMiddlewares,
  isUrlMatchWithReqUrl,
} = require("@/utilities/utilities");

const ignoreMiddlewares = (url, ...middlewares) => {
  checkIgnoreApplyMiddlewaresRequirements(url, middlewares);

  return async (req, res, next) => {
    return isUrlMatchWithReqUrl(url, req.url)
      ? next()
      : await executeMiddlewares({
          middlewares,
          next,
          req,
          res,
        });
  };
};

module.exports = { ignoreMiddlewares };
