const { excludeVersion } = require("@/functions/utilities/utils");

const { otherRouteBaseUrl, ...otherRoutes } = excludeVersion(
  require("@/variables/routes/otherRoutes").otherRoutes
);
const { versionControlBaseUrl, ...versionControlRoutes } = excludeVersion(
  require("@/variables/routes/versionControlRoutes").versionControlRoutes
);
const { cellphoneRouteBaseUrl, ...cellphoneRoutes } = excludeVersion(
  require("@/variables/routes/cellphoneRoutes").cellphoneRoutes
);
const { userRouteBaseUrl, ...userRoutes } = excludeVersion(
  require("@/variables/routes/userRoutes").userRoutes
);
const { privateChatRouteBaseUrl, ...privateChatRoutes } = excludeVersion(
  require("@/variables/routes/privateChatRoutes").privateChatRoutes
);

const routes = Object.values({
  ...cellphoneRoutes,
  ...userRoutes,
  ...privateChatRoutes,
  ...versionControlRoutes,
  ...otherRoutes,
});

const findRouteObject = (url) => {
  try {
    const route = routes.find((item) => {
      return item.fullUrl === url;
    });

    return route;
  } catch (error) {
    logger.log("findRouteObject catch, error:", error);
  }
};

module.exports = { findRouteObject };
