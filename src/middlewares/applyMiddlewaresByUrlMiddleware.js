const { customTypeof } = require("utility-store/src/classes/CustomTypeof");

const {
  errorThrower,
  isUrlMatchWithReqUrl,
} = require("@/functions/utilities/utils");

const applyMiddlewaresByUrlMiddleware = (url, ...middlewares) => {
  errorThrower(
    !customTypeof.check(url).type.isString &&
      !customTypeof.check(url).type.isArray,
    "url must be string or an array"
  );
  errorThrower(!middlewares.length, "You need to pass at least one middleware");

  return async (req, res, next) => {
    try {
      errorThrower(
        !customTypeof.isFunction(res?.json, next),
        "Some of items [res, next] is not a function"
      );

      if (isUrlMatchWithReqUrl(url, req.url)) {
        let hasErrorOnMiddlewares = false;
        for await (const md of middlewares) {
          const result = await md(req, res, () => {});

          if (!result?.ok) {
            hasErrorOnMiddlewares = true;
            break;
          }
        }
        if (!hasErrorOnMiddlewares) {
          next();
        }
      } else next();
    } catch (error) {
      logger.log("applyMiddlewaresByUrlMiddleware catch, error:", error);
      throw error;
    }
  };
};

module.exports = { applyMiddlewaresByUrlMiddleware };
