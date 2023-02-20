const {
  getCountries,
} = require("@/websocket/events/other/handlers/getCountries");
const { logEvent } = require("@/websocket/events/other/handlers/logEvent");
const { ping } = require("@/websocket/events/other/handlers/ping");

const otherHandlers = {
  getCountries,
  logEvent,
  ping,
};

module.exports = {
  otherHandlers,
};
