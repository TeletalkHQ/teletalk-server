const {
  createNewUser,
} = require("@/websocket/events/auth/handlers/createNewUser");
const { logout } = require("@/websocket/events/auth/handlers/logout");
const { signIn } = require("@/websocket/events/auth/handlers/signIn");

const authHandlers = {
  createNewUser,
  logout,
  signIn,
};

module.exports = {
  authHandlers,
};
