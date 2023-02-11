const logEvent = (_socket, event, ...args) => {
  logger.debug(`socket.event:${event}`, ...args);
};

module.exports = { logEvent };
