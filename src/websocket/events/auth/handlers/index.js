const {
  createNewUser,
} = require("@/websocket/events/auth/handlers/createNewUser");
const { logout } = require("@/websocket/events/auth/handlers/logout");

const authHandlers = {
  createNewUser,
  logout,
};

module.exports = {
  authHandlers,
};
