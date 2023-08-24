import { SocketOnAnyHandler } from "~/types";

//CLEANME:
export const logEvent: SocketOnAnyHandler = async (
	_socket,
	data,
	eventName
) => {
	logger.info(`socket.eventName:${eventName}`);
	if (data) {
		logger.info("data:");
		logger.dir("info", data, { depth: 12 });
	}
};
