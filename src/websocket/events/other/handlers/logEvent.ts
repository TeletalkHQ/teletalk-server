import { SocketOnAnyHandler } from "@/types";

//CLEANME:
const logEvent: SocketOnAnyHandler = async (_socket, data, event) => {
  logger.debug(`socket.event:${event}`);
  if (data) {
    logger.debug("data:");
    logger.dir("debug", data, { depth: 12 });
  }
};

export { logEvent };
