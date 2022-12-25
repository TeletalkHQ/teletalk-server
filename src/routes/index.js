const { cellphoneRoutes } = require("@/routes/cellphone");
const { otherRoutes } = require("@/routes/other");
const { privateChatRoutes } = require("@/routes/privateChat");
const { serverRoutes } = require("@/routes/server");
const { stuffRoutes } = require("@/routes/stuff");
const { userRoutes } = require("@/routes/user");

const arrayOfRoutes = Object.values({
  ...cellphoneRoutes,
  ...otherRoutes,
  ...privateChatRoutes,
  ...userRoutes,
  ...stuffRoutes,
});

const ignoredRoutesForAuth = [
  stuffRoutes.getAllStuffs,
  otherRoutes.getCountries,
  otherRoutes.getWelcomeMessage,
  userRoutes.signIn,
  serverRoutes.root,
];

const routes = {
  cellphone: cellphoneRoutes,
  other: otherRoutes,
  privateChat: privateChatRoutes,
  server: serverRoutes,
  stuff: stuffRoutes,
  user: userRoutes,
};

module.exports = {
  arrayOfRoutes,
  ignoredRoutesForAuth,
  routes,
};
