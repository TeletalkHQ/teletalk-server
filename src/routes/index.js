const { userRoutes } = require("@/routes/user");
const { otherRoutes } = require("@/routes/other");
const { privateChatRoutes } = require("@/routes/privateChat");
const { serverRoutes } = require("@/routes/server");
const { stuffRoutes } = require("@/routes/stuff");
const { authRoutes } = require("@/routes/auth");

const arrayOfRoutes = Object.values({
  ...userRoutes,
  ...otherRoutes,
  ...privateChatRoutes,
  ...authRoutes,
  ...stuffRoutes,
});

const ignoredRoutesForAuth = [
  stuffRoutes.getAllStuffs,
  otherRoutes.getCountries,
  otherRoutes.getWelcomeMessage,
  authRoutes.signIn,
  serverRoutes.root,
];

const ignoredUrlsForAuth = ignoredRoutesForAuth.map((item) => item.fullUrl);

const routes = {
  user: userRoutes,
  other: otherRoutes,
  privateChat: privateChatRoutes,
  server: serverRoutes,
  stuff: stuffRoutes,
  auth: authRoutes,
};

module.exports = {
  arrayOfRoutes,
  ignoredRoutesForAuth,
  ignoredUrlsForAuth,
  routes,
};
