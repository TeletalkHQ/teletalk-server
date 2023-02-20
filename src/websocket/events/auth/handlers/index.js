const {
  createNewUser,
} = require("@/websocket/events/auth/handlers/createNewUser");
const { logout } = require("@/websocket/events/auth/handlers/logout");
const { signIn } = require("@/websocket/events/auth/handlers/signIn");
const { verify } = require("@/websocket/events/auth/handlers/verify");

const authHandlers = {
  createNewUser,
  logout,
  signIn,
  verify,
};

module.exports = {
  authHandlers,
};
