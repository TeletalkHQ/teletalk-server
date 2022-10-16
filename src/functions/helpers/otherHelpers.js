const { routes } = require("@/routes");

const getIgnoredUrlsForAuth = () => {
  const arrayOfIgnoringUrl = [
    routes.versionControl.getAllStuffs,
    routes.other.getCountries,
    routes.other.getWelcomeMessage,
    routes.user.signInNormal,
    { fullUrl: "/" },
  ].map((item) => item.fullUrl);
  return arrayOfIgnoringUrl;
};

module.exports = { getIgnoredUrlsForAuth };
