/* eslint-disable indent */
import { utilities } from "@/utilities";

const ignoreMiddlewares = (url, ...middlewares) => {
  return async (req, res, next) => {
    return utilities.isUrlMatchWithReqUrl(url, req.url)
      ? next()
      : await utilities.executeMiddlewares({
          middlewares,
          next,
          req,
          res,
        });
  };
};

export { ignoreMiddlewares };
