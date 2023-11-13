/* eslint-disable indent */
import { EventName } from "teletalk-type-store";

import { SocketMiddleware } from "~/types";
import { utils } from "~/utils";

export const ignoreMiddlewares = (
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
