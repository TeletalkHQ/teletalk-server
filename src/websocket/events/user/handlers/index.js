const {
  updateOnlineStatus,
} = require("@/websocket/events/user/handlers/updateOnlineStatus");

const userHandlers = {
  updateOnlineStatus,
};

module.exports = {
  userHandlers,
};
