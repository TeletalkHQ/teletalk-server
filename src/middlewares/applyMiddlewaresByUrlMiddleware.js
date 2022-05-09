const {
  errorThrower,
  isFunction,
  isUrlMatchWithReqUrl,
} = require("@/functions/utilities/utils");

const applyMiddlewaresByUrlMiddleware = (url, ...middlewares) => {
  errorThrower(
    typeof url !== "string" && !Array.isArray(url),
    "url must be string or an array"
  );
  errorThrower(!middlewares.length, "You need to pass at least one middleware");

  return async (req, res, next) => {
    try {
      errorThrower(
        !isFunction(res?.json, next),
        "Some of items [res, next] is not a function"
      );

      if (isUrlMatchWithReqUrl(url, req.url)) {
        let noErrorOnMiddlewares = true;
        for await (const md of middlewares) {
          const result = await md(req, res, () => {});

          if (!result?.done) {
            noErrorOnMiddlewares = false;
            break;
          }
        }
        if (noErrorOnMiddlewares) {
          next();
        }
      } else {
        return next();
      }
    } catch (error) {
      logger.log("applyMiddlewaresByUrlMiddleware catch, error:", error);
    }
  };
};

module.exports = { applyMiddlewaresByUrlMiddleware };
