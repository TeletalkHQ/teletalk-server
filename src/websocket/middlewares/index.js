const {
  attachCurrentUserId,
} = require("@/websocket/middlewares/attachCurrentUserId");
const { auth } = require("@/websocket/middlewares/auth");
const { checkDataFields } = require("@/websocket/middlewares/checkDataFields");
const {
  checkCurrentUserStatus,
} = require("@/websocket/middlewares/checkCurrentUserStatus");
const {
  checkEventAvailability,
} = require("@/websocket/middlewares/checkEventAvailability");

const middlewares = {
  attachCurrentUserId,
  auth,
  checkDataFields,
  checkCurrentUserStatus,
  checkEventAvailability,
};

module.exports = {
  middlewares,
};
