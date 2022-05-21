const {
  cellphoneRoutes: { version: v1, ...cellphoneRoutes },
} = require("@/variables/routes/cellphoneRoutes");
const {
  userRoutes: { version: v2, ...userRoutes },
} = require("@/variables/routes/userRoutes");
const {
  privateChatRoutes: { version: v3, ...privateChatRoutes },
} = require("@/variables/routes/privateChatRoutes");

const routes = {
  ...cellphoneRoutes,
  ...userRoutes,
  ...privateChatRoutes,
};

const findRouteObject = (url) => {
  try {
    const [, , ...rest] = url.split("/");

    // const reqUrl = rest.at(-1);
    const fullUrl = rest.join("/");

    const routeObjectKey = Object.keys(routes).find((key) => {
      return routes[key].url === `/${fullUrl}`;
    });

    return routes[routeObjectKey];
  } catch (error) {
    logger.log("findRouteObject catch, error:", error);
  }
};

module.exports = { findRouteObject };
