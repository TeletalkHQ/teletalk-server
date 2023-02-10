const { logout } = require("@/websocket/handlers/auth/logout");

const authHandlers = {
  logout,
};

module.exports = {
  authHandlers,
};
