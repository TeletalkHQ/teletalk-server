/* eslint-disable indent */
import { SocketMiddleware, SocketMiddlewareEvent } from "@/types";

import { utilities } from "@/utilities";

const ignoreMiddlewares = (
  events: SocketMiddlewareEvent,
  ...middlewares: SocketMiddleware[]
) => {
  return (async (socket, next, event) => {
    return utilities.isEventNameMatch(events, event[0])
      ? next()
      : await utilities.executeMiddlewares({
          event,
          middlewares,
          next,
          socket,
        });
  }) as SocketMiddleware;
};

export { ignoreMiddlewares };
