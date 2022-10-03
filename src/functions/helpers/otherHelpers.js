const {
  userRoutes: { signInNormalRoute },
} = require("@/variables/routes/userRoutes");
const {
  versionControlRoutes: { getAllStuffsRoute },
} = require("@/variables/routes/versionControlRoutes");
const {
  otherRoutes: { getCountriesRoute, getWelcomeMessageRoute },
} = require("@/variables/routes/otherRoutes");

const getIgnoredUrlsForAuth = () => {
  const arrayOfIgnoringUrl = [
    getAllStuffsRoute,
    getCountriesRoute,
    getWelcomeMessageRoute,
    signInNormalRoute,
    { fullUrl: "/" },
  ].map((item) => item.fullUrl);
  return arrayOfIgnoringUrl;
};

module.exports = { getIgnoredUrlsForAuth };
