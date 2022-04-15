const { routeGenerator } = require("~/functions/utilities/generators");

const baseUrl = routeGenerator(true, "/user", true, "1.0.0");

const createNewUser = routeGenerator(
  "post",
  "/normalUser/createNewNormalUser",
  200,
  "1.0.0",
  "Use for create new user for normal account"
);

const logoutNormal = routeGenerator(
  "post",
  "/normalUser/logoutNormalUser",
  200,
  "1.0.0",
  "Use for logout client as a normal account"
);
const signInNormal = routeGenerator(
  "post",
  "/normalUser/signInNormalUser",
  200,
  "1.0.0",
  "Use for sign in client as a normal account"
);

const statusCheck = routeGenerator(
  "get",
  "/normalUser/statusCheck",
  200,
  "1.0.0",
  "Use for check client availability as a normal account"
);

const verifySignInNormal = routeGenerator(
  "post",
  "/normalUser/verifySignInNormalUser",
  200,
  "1.0.0",
  "Use for verify sign in (normal account) as normal account"
);

const userRoutes = {
  info: {
    version: "1.0.0",
  },

  properties: {
    baseUrl,
    createNewUser,
    logoutNormal,
    signInNormal,
    statusCheck,
    verifySignInNormal,
  },
};

module.exports = {
  userRoutes,
};
