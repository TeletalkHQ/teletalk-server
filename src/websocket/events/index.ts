import { Socket } from "socket.io";

import { auth } from "~/websocket/events/auth";
import { other } from "~/websocket/events/other";
import { privateChat } from "~/websocket/events/privateChat";
import { user } from "~/websocket/events/user";

export const events = [
	...auth.events,
	...other.events,
	...privateChat.events,
	...user.events,
];

export const registerEvents = (socket: Socket) => {
	events.forEach((item) => {
		socket.customOn(item.name, item.handler);
	});
};

export const eventsWithoutAuth = events.filter(
	(i) => i.isAuthRequired === false
);

export const eventsWithAuth = events.filter((i) => i.isAuthRequired === true);
