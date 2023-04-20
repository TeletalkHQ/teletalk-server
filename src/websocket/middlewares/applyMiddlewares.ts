import { SocketMiddleware, SocketMiddlewareEvent } from "@/types";

import { utilities } from "@/utilities";

const applyMiddlewares = (
  events: SocketMiddlewareEvent,
  ...middlewares: SocketMiddleware[]
) => {
  return (async (socket, next, event) => {
    if (utilities.isEventNameMatch(events, event[0])) {
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
