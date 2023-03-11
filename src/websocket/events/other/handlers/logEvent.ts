const logEvent = async (_socket, _io, event, data, ...args) => {
  logger.debug(`socket.event:${event}`, ...args);
  if (data) {
    logger.log("data:");
    console.dir(data, { depth: 12 });
  }
};

export { logEvent };
