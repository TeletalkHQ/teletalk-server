import { EventName } from "teletalk-type-store";

import { SocketMiddleware } from "~/types";
import { utils } from "~/utils";

export const applyMiddlewares = (
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
