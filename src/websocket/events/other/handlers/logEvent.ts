import { SocketOnAnyHandler } from "~/types";

//CLEANME:
export const logEvent: SocketOnAnyHandler = async (
  _socket,
  data,
  eventName
) => {
  logger.debug(`socket.eventName:${eventName}`);
  if (data) {
    logger.debug("data:");
    logger.dir("debug", data, { depth: 12 });
  }
};
