const {
  userRoutes: { signInNormalRoute },
} = require("@/variables/routes/userRoutes");
const {
  versionControlRoutes: { getAllStuffsRoute },
} = require("@/variables/routes/versionControlRoutes");
const {
  otherRoutes: { countriesRoute, welcomeRoute },
} = require("@/variables/routes/otherRoutes");

const getIgnoredUrlsForAuth = () => {
  const arrayOfIgnoringUrl = [
    signInNormalRoute,
    getAllStuffsRoute,
    welcomeRoute,
    countriesRoute,
  ].map((item) => item.fullUrl);
  return arrayOfIgnoringUrl;
};

module.exports = { getIgnoredUrlsForAuth };
