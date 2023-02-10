const {
  attachCurrentUserId,
} = require("@/websocket/middlewares/attachCurrentUserId");
const { auth } = require("@/websocket/middlewares/auth");
const {
  checkCurrentUserStatus,
} = require("@/websocket/middlewares/checkCurrentUserStatus");

const middlewares = {
  attachCurrentUserId,
  auth,
  checkCurrentUserStatus,
};

module.exports = {
  middlewares,
};
