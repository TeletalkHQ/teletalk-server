const logEvent = (_socket, _io, event, _data, _callback, ...args) => {
  logger.debug(`socket.event:${event}`, ...args);
};

module.exports = { logEvent };
