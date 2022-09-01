const { trier } = require("utility-store/src/classes/Trier");

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
  ...otherRoutes,
  ...privateChatRoutes,
  ...userRoutes,
  ...versionControlRoutes,
});

const tryToFindRouteObject = (url) => {
  const route = routes.find((item) => {
    return item.fullUrl === url;
  });

  return route;
};

const findRouteObject = (url) => {
  return trier(findRouteObject.name)
    .try(tryToFindRouteObject, url)
    .printAndThrow().result;
};

module.exports = { findRouteObject };
