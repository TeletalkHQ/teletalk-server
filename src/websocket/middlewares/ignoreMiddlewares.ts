/* eslint-disable indent */
import { EventName, SocketMiddleware } from "~/types";
import { utils } from "~/utils";

const ignoreMiddlewares = (
  eventNamesToIgnore: EventName | EventName[],
  ...middlewares: SocketMiddleware[]
) => {
  return (async (socket, next, socketMiddlewareEvent) => {
    return utils.isEventNameMatch(eventNamesToIgnore, socketMiddlewareEvent[0])
      ? next()
      : await utils.executeMiddlewares({
          middlewares,
          next,
          socket,
          socketMiddlewareEvent,
        });
  }) as SocketMiddleware;
};

export { ignoreMiddlewares };
