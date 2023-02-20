const { otherRoutes } = require("@/http/routes/other");
const { serverRoutes } = require("@/http/routes/server");
const { stuffRoutes } = require("@/http/routes/stuff");

const arrayOfRoutes = Object.values({
  ...otherRoutes,
  ...stuffRoutes,
});

// const ignoredRoutesForAuth = [
//   stuffRoutes.getAllStuffs,
//   otherRoutes.getCountries,
//   otherRoutes.getWelcomeMessage,
//   authRoutes.signIn,
//   serverRoutes.root,
// ];

// const ignoredUrlsForAuth = ignoredRoutesForAuth.map((item) => item.fullUrl);

const routes = {
  other: otherRoutes,
  server: serverRoutes,
  stuff: stuffRoutes,
};

module.exports = {
  arrayOfRoutes,
  routes,
};
