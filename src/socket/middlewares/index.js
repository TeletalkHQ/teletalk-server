const { auth } = require("@/socket/middlewares/auth");

const middlewares = {
  auth,
};

module.exports = {
  middlewares,
};
