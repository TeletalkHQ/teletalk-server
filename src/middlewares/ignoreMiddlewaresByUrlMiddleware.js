const { customTypeof } = require("utility-store/src/classes/CustomTypeof");

const {
  errorThrower,
  isUrlMatchWithReqUrl,
  crashServer,
} = require("@/functions/utilities/utilities");

const ignoreMiddlewaresByUrlMiddleware = (url, ...middlewares) => {
  errorThrower(
    customTypeof.isNotArray(url) && customTypeof.isNotString(url),
    "url must be string or an array"
  );
  errorThrower(!middlewares.length, "You need to pass at least one middleware");

  return async (req, res, next) => {
    try {
      errorThrower(
        customTypeof.isNotFunction(res?.json, next),
        "Some of items [res, next] is not a function"
      );

      if (isUrlMatchWithReqUrl(url, req.url)) {
        return next();
      }

      let shouldContinue = true;
      for await (const md of middlewares) {
        const result = await md(req, res, () => {});

        if (!result?.ok) {
          shouldContinue = false;
          break;
        }
      }
      if (shouldContinue) {
        next();
      }
    } catch (error) {
      logger.log("ignoreMiddlewaresByUrlMiddleware catch, error:", error);
      crashServer();
    }
  };
};

module.exports = { ignoreMiddlewaresByUrlMiddleware };
