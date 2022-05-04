const {
  errorThrower,
  isFunction,
  isUrlShouldIgnore,
} = require("@/functions/utilities/utilsNoDeps");

const ignoreMiddlewaresByUrlMiddleware = (url, ...middlewares) => {
  errorThrower(
    typeof url !== "string" && !Array.isArray(url),
    "url must be string or an array"
  );
  errorThrower(!middlewares.length, "You need to pass at least one middleware");

  return async (req, res, next) => {
    errorThrower(
      !isFunction(res?.json, next),
      "Some of items [res, next] is not a function"
    );

    if (isUrlShouldIgnore(url, req.url)) {
      return next();
    }

    for await (const md of middlewares) {
      await md(req, res, () => {});
    }

    next();
  };
};

module.exports = { ignoreMiddlewaresByUrlMiddleware };
