const { logEvent } = require("@/websocket/events/other/handlers/logEvent");
const { ping } = require("@/websocket/events/other/handlers/ping");

const otherHandlers = {
  logEvent,
  ping,
};

module.exports = {
  otherHandlers,
};
