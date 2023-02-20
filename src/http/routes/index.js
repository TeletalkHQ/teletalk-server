const { serverRoutes } = require("@/http/routes/server");
const { stuffRoutes } = require("@/http/routes/stuff");

const arrayOfRoutes = Object.values({
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
  server: serverRoutes,
  stuff: stuffRoutes,
};

module.exports = {
  arrayOfRoutes,
  routes,
};
