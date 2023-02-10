const {
  attachCurrentUserId,
} = require("@/websocket/middlewares/attachCurrentUserId");
const { auth } = require("@/websocket/middlewares/auth");
const {
  checkCurrentUserStatus,
} = require("@/websocket/middlewares/checkCurrentUserStatus");
const { connection } = require("@/websocket/middlewares/connection");

const middlewares = {
  attachCurrentUserId,
  auth,
  checkCurrentUserStatus,
  connection,
};

module.exports = {
  middlewares,
};
