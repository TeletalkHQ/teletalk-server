const {
  getEnvironment,
  isUrlMatchWithReqUrl,
  concatBaseUrlWithUrl,
} = require("@/functions/utilities/utils");

const {
  ENVIRONMENT_KEYS,
} = require("@/variables/constants/environmentInitialValues");
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

  return getEnvironment(
    condition
      ? ENVIRONMENT_KEYS.JWT_SIGN_IN_SECRET
      : ENVIRONMENT_KEYS.JWT_MAIN_SECRET
  );
};

module.exports = { getSecretWithUrlCondition };
