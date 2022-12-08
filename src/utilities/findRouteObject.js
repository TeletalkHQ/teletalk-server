const {
  objectUtilities,
} = require("utility-store/src/classes/ObjectUtilities");
const { trier } = require("utility-store/src/classes/Trier");

const { excludeVersions } = require("@/utilities/utilities");

const { routes } = require("@/routes");

const routesWithoutVersion = objectUtilities.objectValues({
  ...excludeVersions(routes.cellphone),
  ...excludeVersions(routes.other),
  ...excludeVersions(routes.privateChat),
  ...excludeVersions(routes.user),
  ...excludeVersions(routes.versionControl),
});

const tryToFindRouteObject = (url) => {
  return routesWithoutVersion.find((item) => {
    return item.fullUrl === url;
  });
};

const findRouteObject = (url) => {
  return trier(findRouteObject.name)
    .try(tryToFindRouteObject, url)
    .printAndThrow()
    .result();
};

module.exports = { findRouteObject };
