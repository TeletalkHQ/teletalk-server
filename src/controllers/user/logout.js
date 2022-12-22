const { authManager } = require("@/classes/AuthManager");
const { controllerBuilder } = require("@/classes/ControllerBuilder");

const { services } = require("@/services");

const tryToLogout = async (req) => {
  const { currentUserId } = req;
  const currentToken = authManager.getTokenFromAuthorization(req);

  return await services.logout().run({
    currentToken,
    currentUserId,
  });
};

const logout = controllerBuilder.create().body(tryToLogout).build();

module.exports = { logout };
