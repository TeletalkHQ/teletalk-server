const { disconnect } = require("@/websocket/events/user/handlers/disconnect");
const {
  updateOnlineStatus,
} = require("@/websocket/events/user/handlers/updateOnlineStatus");

const userHandlers = {
  disconnect,
  updateOnlineStatus,
};

module.exports = {
  userHandlers,
};
