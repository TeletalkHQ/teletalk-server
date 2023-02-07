const {
  updateOnlineStatus,
} = require("@/websocket/handlers/user/updateOnlineStatus");

const userHandlers = {
  updateOnlineStatus,
};

module.exports = {
  userHandlers,
};
