const { excludeVersions } = require("@/functions/utilities/utils");

//TODO Get routes from allStuff
const { otherRouteBaseUrl, ...otherRoutes } = excludeVersions(
  require("@/variables/routes/otherRoutes").otherRoutes
);
const { versionControlBaseUrl, ...versionControlRoutes } = excludeVersions(
  require("@/variables/routes/versionControlRoutes").versionControlRoutes
);
const { cellphoneRouteBaseUrl, ...cellphoneRoutes } = excludeVersions(
  require("@/variables/routes/cellphoneRoutes").cellphoneRoutes
);
const { userRouteBaseUrl, ...userRoutes } = excludeVersions(
  require("@/variables/routes/userRoutes").userRoutes
);
const { privateChatRouteBaseUrl, ...privateChatRoutes } = excludeVersions(
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
    throw error;
  }
};

module.exports = { findRouteObject };
