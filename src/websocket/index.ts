import http from "http";
import { Server } from "socket.io";

import { clientStatusStore } from "~/classes/ClientStatusStore";
import { customMethods } from "~/websocket/custom/methods";
import { registerEvents } from "~/websocket/events";
import { registerMiddlewares } from "~/websocket/middlewares";

type HttpServer = http.Server<
	typeof http.IncomingMessage,
	typeof http.ServerResponse
>;

export const websocketServer = async (httpServer: HttpServer) => {
	const io = new Server(httpServer, {
		cors: {
			credentials: true,
			origin: true,
		},
	});

	await clientStatusStore.removeAll();
	// await authClientStore.removeAll();

	io.on("connection", (socket) => {
		socket.io = io;
		socket.join("public");

		socket.customOn = customMethods.registerCustomOn(socket);
		socket.customUse = customMethods.registerCustomUse(socket);

		registerMiddlewares(socket);

		registerEvents(socket);
	});

	return io;
};
