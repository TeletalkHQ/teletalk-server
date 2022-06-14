const { excludeVersion } = require("@/functions/utilities/utils");

const { versionControlRoutes } = excludeVersion(
  require("@/variables/routes/versionControlRoutes")
);
const { cellphoneRouteBaseUrl, ...cellphoneRoutes } =
  require("@/variables/routes/cellphoneRoutes").cellphoneRoutes;
const { userRouteBaseUrl, ...userRoutes } = excludeVersion(
  require("@/variables/routes/userRoutes").userRoutes
);
const { privateChatRouteBaseUrl, ...privateChatRoutes } = excludeVersion(
  require("@/variables/routes/privateChatRoutes").privateChatRoutes
);

const routes = {
  ...cellphoneRoutes,
  ...userRoutes,
  ...privateChatRoutes,
  ...versionControlRoutes,
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
