import { trier } from "simple-trier";
import { Socket } from "socket.io";
import { EventName } from "teletalk-type-store";

import { CustomEmit, SocketResponse } from "~/types";

export const registerCustomEmit = (socket: Socket) => {
	return ((eventName, response) => {
		trier(`socket.customEmit:${eventName}`)
			.sync()
			.try(tryBlock, socket, response, eventName)
			.throw()
			.run();
	}) as CustomEmit;
};

const tryBlock = (
	socket: Socket,
	response: SocketResponse,
	eventName: EventName
) => {
	socket.emit(eventName, response);
};
