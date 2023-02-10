const { disconnect } = require("@/websocket/handlers/other/disconnect");
const { pong } = require("@/websocket/handlers/other/pong");

const otherHandlers = {
  disconnect,
  pong,
};

module.exports = {
  otherHandlers,
};
