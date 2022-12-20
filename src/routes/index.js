const {
  objectUtilities,
} = require("utility-store/src/classes/ObjectUtilities");

const { cellphone } = require("@/routes/cellphone");
const { other } = require("@/routes/other");
const { privateChat } = require("@/routes/privateChat");
const { server } = require("@/routes/server");
const { stuff } = require("@/routes/stuff");
const { user } = require("@/routes/user");

const { excludeVersions } = require("@/utilities/utilities");

const arrayOfRoutes = objectUtilities.objectValues({
  ...excludeVersions(cellphone),
  ...excludeVersions(other),
  ...excludeVersions(privateChat),
  ...excludeVersions(user),
  ...excludeVersions(stuff),
});

const ignoredRoutesForAuth = [
  stuff.getAllStuffs,
  other.getCountries,
  other.getWelcomeMessage,
  user.signIn,
  server.root,
];

const routes = {
  cellphone,
  other,
  privateChat,
  server,
  stuff,
  user,
};

module.exports = {
  arrayOfRoutes,
  ignoredRoutesForAuth,
  routes,
};
