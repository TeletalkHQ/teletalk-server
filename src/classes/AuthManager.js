const JWT = require("jsonwebtoken");

const { envManager } = require("@/classes/EnvironmentManager");

const {
  isUrlMatchWithReqUrl,
  errorThrower,
} = require("@/functions/utilities/utils");

const {
  userRoutes: { verifySignInNormalRoute, createNewUserRoute },
} = require("@/variables/routes/userRoutes");

class AuthManager {
  constructor() {
    //? Is this should change by dev's ?
    this.options = { algorithm: "HS256" };
  }

  tokenVerifier(
    token,
    secret = this.getJwtMainSecret(),
    options = this.options
  ) {
    try {
      const data = JWT.verify(token, secret, {
        complete: true,
        ...this.options,
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
    secret = this.getJwtMainSecret(),
    options = this.options
  ) {
    try {
      return JWT.sign(data, secret, {
        ...this.options,
        ...options,
      });
    } catch (error) {
      logger.log("tokenSigner catch, error:", error);
      errorThrower(error, error);
    }
  }

  getSecretWithUrlCondition(reqUrl) {
    const isSignInUrl = isUrlMatchWithReqUrl(
      [verifySignInNormalRoute.fullUrl, createNewUserRoute.fullUrl],
      reqUrl
    );

    return isSignInUrl ? this.getJwtSignInSecret() : this.getJwtMainSecret();
  }

  getJwtSignInSecret() {
    const { JWT_SIGN_IN_SECRET } = envManager.ENVIRONMENT_KEYS;
    return envManager.getEnvironment(JWT_SIGN_IN_SECRET);
  }
  getJwtMainSecret() {
    const { JWT_MAIN_SECRET } = envManager.ENVIRONMENT_KEYS;
    return envManager.getEnvironment(JWT_MAIN_SECRET);
  }
  getJwtSecrets() {
    return {
      JWT_MAIN_SECRET: this.getJwtMainSecret(),
      JWT_SIGN_IN_SECRET: this.getJwtSignInSecret(),
    };
  }
}

const authManager = new AuthManager();

module.exports = { authManager, AuthManager };
