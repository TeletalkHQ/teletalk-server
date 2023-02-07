const { userRoutes } = require("@/http/routes/user");
const { otherRoutes } = require("@/http/routes/other");
const { privateChatRoutes } = require("@/http/routes/privateChat");
const { serverRoutes } = require("@/http/routes/server");
const { stuffRoutes } = require("@/http/routes/stuff");
const { authRoutes } = require("@/http/routes/auth");

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
