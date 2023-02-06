const {
  updateOnlineStatus,
} = require("@/socket/handlers/user/updateOnlineStatus");

const userHandlers = {
  updateOnlineStatus,
};

module.exports = {
  userHandlers,
};
