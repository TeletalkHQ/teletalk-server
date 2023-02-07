const { auth } = require("@/websocket/middlewares/auth");

const middlewares = {
  auth,
};

module.exports = {
  middlewares,
};
