const {
  getCountries,
} = require("@/websocket/events/other/handlers/getCountries");
const {
  getWelcomeMessage,
} = require("@/websocket/events/other/handlers/getWelcomeMessage");
const { logEvent } = require("@/websocket/events/other/handlers/logEvent");
const { ping } = require("@/websocket/events/other/handlers/ping");

const otherHandlers = {
  getCountries,
  getWelcomeMessage,
  logEvent,
  ping,
};

module.exports = {
  otherHandlers,
};
