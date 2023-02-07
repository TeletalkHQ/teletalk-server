const { authManager } = require("@/classes/AuthManager");
const { controllerBuilder } = require("@/classes/ControllerBuilder");

const { services } = require("@/services");

const tryToLogout = async (req, res) => {
  const { currentUserId } = req;
  const currentToken = authManager.getTokenFromRequest(req);

  await services.logout().run({
    currentToken,
    currentUserId,
  });

  authManager.removeSession(res);
};

const logout = controllerBuilder.create().body(tryToLogout).build();

module.exports = { logout };
