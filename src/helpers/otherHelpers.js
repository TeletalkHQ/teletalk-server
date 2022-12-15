const { routes } = require("@/routes");

const getIgnoredUrlsForAuth = () => {
  return [
    routes.stuff.getAllStuffs,
    routes.other.getCountries,
    routes.other.getWelcomeMessage,
    routes.user.signInNormal,
    { fullUrl: "/" },
  ].map((item) => item.fullUrl);
};

module.exports = { getIgnoredUrlsForAuth };
