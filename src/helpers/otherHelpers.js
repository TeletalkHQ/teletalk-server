const { ignoredRoutesForAuth } = require("@/routes");

const getIgnoredUrlsForAuth = () => {
  return ignoredRoutesForAuth.map((item) => item.fullUrl);
};

module.exports = { getIgnoredUrlsForAuth, ignoredRoutesForAuth };
