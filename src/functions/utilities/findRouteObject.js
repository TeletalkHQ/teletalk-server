const {
  cellphoneRoutes: { version: v1, cellphoneRouteBaseUrl, ...cellphoneRoutes },
} = require("@/variables/routes/cellphoneRoutes");
const {
  userRoutes: { version: v2, userRouteBaseUrl, ...userRoutes },
} = require("@/variables/routes/userRoutes");
const {
  privateChatRoutes: {
    version: v3,
    privateChatRouteBaseUrl,
    ...privateChatRoutes
  },
} = require("@/variables/routes/privateChatRoutes");

const routes = {
  ...cellphoneRoutes,
  ...userRoutes,
  ...privateChatRoutes,
};

const routesKeys = Object.keys(routes);

const findRouteObject = (url) => {
  try {
    const [, , ...rest] = url.split("/");

    // const reqUrl = rest.at(-1);
    const fullUrl = rest.join("/");

    const routeObjectKey = routesKeys.find((key) => {
      return routes[key].url === `/${fullUrl}`;
    });

    return routes[routeObjectKey];
  } catch (error) {
    logger.log("findRouteObject catch, error:", error);
  }
};

module.exports = { findRouteObject };
