const {
  errorThrower,
  isFunction,
  isUrlMatchWithReqUrl,
  crashServer,
  isArray,
  customTypeof,
} = require("@/functions/utilities/utils");

const ignoreMiddlewaresByUrlMiddleware = (url, ...middlewares) => {
  errorThrower(
    !customTypeof(url).type.string && !isArray(url),
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
        return next();
      }

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
    } catch (error) {
      logger.log("ignoreMiddlewaresByUrlMiddleware catch, error:", error);
      crashServer();
    }
  };
};

module.exports = { ignoreMiddlewaresByUrlMiddleware };
