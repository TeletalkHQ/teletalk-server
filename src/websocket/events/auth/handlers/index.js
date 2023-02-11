const { logout } = require("@/websocket/events/auth/handlers/logout");

const authHandlers = {
  logout,
};

module.exports = {
  authHandlers,
};
