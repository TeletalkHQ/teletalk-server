import { utilities } from "@/utilities";

const applyMiddlewares = (url, ...middlewares) => {
  return async (req, res, next) => {
    if (utilities.isUrlMatchWithReqUrl(url, req.url)) {
      return await utilities.executeMiddlewares({
        middlewares,
        next,
        req,
        res,
      });
    }

    next();
  };
};

export { applyMiddlewares };
