const {
  isUrlMatchWithReqUrl,
  concatBaseUrlWithUrl,
} = require("@/functions/utilities/utils");
const { envManager } = require("@/classes/EnvironmentManager");

const {
  userRoutes: { userRouteBaseUrl, verifySignInNormalRoute, createNewUserRoute },
} = require("@/variables/routes/userRoutes");

const getSecretWithUrlCondition = (reqUrl) => {
  const condition = isUrlMatchWithReqUrl(
    [
      concatBaseUrlWithUrl(userRouteBaseUrl, verifySignInNormalRoute),
      concatBaseUrlWithUrl(userRouteBaseUrl, createNewUserRoute),
    ],
    reqUrl
  );

  return condition
    ? envManager.getJwtSignInSecret()
    : envManager.getJwtMainSecret();
};

module.exports = { getSecretWithUrlCondition };
