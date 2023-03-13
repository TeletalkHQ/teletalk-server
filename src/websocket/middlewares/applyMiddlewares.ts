import { SocketMiddleware } from "@/types";

import { utilities } from "@/utilities";

type SocketMiddlewareEvent = string | string[];

const applyMiddlewares = (
  events: SocketMiddlewareEvent,
  ...middlewares: SocketMiddleware[]
) => {
  return (async (socket, next, event) => {
    if (utilities.isUrlMatchWithReqUrl(events, event[0])) {
      return await utilities.executeMiddlewares({
        event,
        middlewares,
        next,
        socket,
      });
    }

    next();
  }) as SocketMiddleware;
};

export { applyMiddlewares };
