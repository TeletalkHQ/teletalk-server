const JWT = require("jsonwebtoken");

const { envManager } = require("@/classes/EnvironmentManager");

const {
  isUrlMatchWithReqUrl,
  errorThrower,
} = require("@/functions/utilities/utils");

const {
  initialOptions: { jwtDefaultOptions },
} = require("@/variables/others/initialOptions");

const {
  userRoutes: { verifySignInNormalRoute, createNewUserRoute },
} = require("@/variables/routes/userRoutes");

class AuthManager {
  tokenVerifier(
    token,
    secret = envManager.getJwtMainSecret(),
    options = jwtDefaultOptions
  ) {
    try {
      const data = JWT.verify(token, secret, {
        complete: true,
        ...jwtDefaultOptions,
        ...options,
      });

      return { data, done: true };
    } catch (error) {
      logger.log("tokenVerifier catch, error:", error);
      return {
        error,
        done: false,
      };
    }
  }

  async tokenSigner(
    data,
    secret = envManager.getJwtMainSecret(),
    options = jwtDefaultOptions
  ) {
    try {
      return JWT.sign(data, secret, {
        ...jwtDefaultOptions,
        ...options,
      });
    } catch (error) {
      logger.log("tokenSigner catch, error:", error);
      errorThrower(error, error);
    }
  }

  getSecretWithUrlCondition(reqUrl) {
    const condition = isUrlMatchWithReqUrl(
      [verifySignInNormalRoute.fullUrl, createNewUserRoute.fullUrl],
      reqUrl
    );

    return condition
      ? envManager.getJwtSignInSecret()
      : envManager.getJwtMainSecret();
  }
}

const authManager = new AuthManager();

module.exports = { authManager, AuthManager };
