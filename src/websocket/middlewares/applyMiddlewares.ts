import { EventName, SocketMiddleware } from "~/types";
import { utils } from "~/utils";

const applyMiddlewares = (
  eventNamesToApply: EventName | EventName[],
  ...middlewares: SocketMiddleware[]
) => {
  return (async (socket, next, socketMiddlewareEvent) => {
    if (utils.isEventNameMatch(eventNamesToApply, socketMiddlewareEvent[0])) {
      return await utils.executeMiddlewares({
        middlewares,
        next,
        socket,
        socketMiddlewareEvent,
      });
    }

    next();
  }) as SocketMiddleware;
};

export { applyMiddlewares };
