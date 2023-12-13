import { EventName } from "teletalk-type-store";

import { SocketMiddleware } from "~/types";
import { utils } from "~/utils";

const applyMiddlewares = (
  eventNamesToApply: EventName | EventName[],
  ...middlewares: SocketMiddleware[]
) => {
  return (async (socket, next, socketMiddlewareEvent) => {
    if (utils.isEventNameMatch(eventNamesToApply, socketMiddlewareEvent[0]))
      await utils.executeMiddlewares({
        middlewares,
        next,
        socket,
        socketMiddlewareEvent,
      });
    else next();
  }) as SocketMiddleware;
};

const ignoreMiddlewares = (
  eventNamesToIgnore: EventName | EventName[],
  ...middlewares: SocketMiddleware[]
) => {
  return (async (socket, next, socketMiddlewareEvent) => {
    if (utils.isEventNameMatch(eventNamesToIgnore, socketMiddlewareEvent[0]))
      next();
    else
      await utils.executeMiddlewares({
        middlewares,
        next,
        socket,
        socketMiddlewareEvent,
      });
  }) as SocketMiddleware;
};

export const middlewareUtils = {
  applyMiddlewares,
  ignoreMiddlewares,
};
