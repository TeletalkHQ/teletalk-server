const { routeTemplateGenerator } = require("~/functions/utilities/generators");

const baseUrl = routeTemplateGenerator(true, "/user", true, "1.0.0");

const countries = routeTemplateGenerator(
  "get",
  "/countries",
  200,
  "1.0.0",
  "Use for get countries for normal account"
);

const createNewUser = routeTemplateGenerator(
  "post",
  "/normalUser/createNewNormalUser",
  200,
  "1.0.0",
  "Use for create new user for normal account"
);

const logoutNormal = routeTemplateGenerator(
  "post",
  "/normalUser/logoutNormalUser",
  200,
  "1.0.0",
  "Use for logout client as a normal account"
);
const signInNormal = routeTemplateGenerator(
  "post",
  "/normalUser/signInNormalUser",
  200,
  "1.0.0",
  "Use for sign in client as a normal account"
);

const statusCheck = routeTemplateGenerator(
  "get",
  "/normalUser/statusCheck",
  200,
  "1.0.0",
  "Use for check client availability as a normal account"
);

const verifySignInNormal = routeTemplateGenerator(
  "post",
  "/normalUser/verifySignInNormalUser",
  200,
  "1.0.0",
  "Use for verify sign in (normal account) as normal account"
);

const userRouterTemplate = {
  baseUrl,
  countries,
  createNewUser,
  logoutNormal,
  signInNormal,
  statusCheck,
  verifySignInNormal,
  version: "1.0.0",
};

module.exports = {
  userRouterTemplate,
};
