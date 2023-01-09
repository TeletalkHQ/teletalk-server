const { createNewUser } = require("@/services/auth/createNewUser");
const { logout } = require("@/services/auth/logout");

const authServices = {
  createNewUser,
  logout,
};

module.exports = {
  authServices,
};
