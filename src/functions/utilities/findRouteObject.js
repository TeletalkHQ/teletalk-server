const {
  cellphoneRoutes: { version: v1, ...cellphoneRoutes },
} = require("@/variables/routes/cellphoneRoutes");
const {
  userRoutes: { version: v2, ...userRoutes },
} = require("@/variables/routes/userRoutes");

const routes = { ...cellphoneRoutes, ...userRoutes };

const findRouteObject = (url) => {
  const [, , ...rest] = url.split("/");

  const fullUrl = rest.join("/");
  const routeObjectKey = Object.keys(routes).find(
    (key) => routes[key].url === `/${fullUrl}`
  );

  return routes[routeObjectKey];
};

module.exports = { findRouteObject };
