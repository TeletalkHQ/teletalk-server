const JWT = require("jsonwebtoken");

const { envManager } = require("@/classes/EnvironmentManager");

const {
  isUrlMatchWithReqUrl,
  errorThrower,
} = require("@/functions/utilities/utils");

const {
  userRoutes: { verifySignInNormalRoute, createNewUserRoute },
} = require("@/variables/routes/userRoutes");
const { printCatchError } = require("utility-store/src/functions/utilities");
const { trier } = require("utility-store/src/classes/Trier");

class AuthManager {
  constructor() {
    //? Is this should change by dev's ?
    this.options = { algorithm: "HS256" };
  }

  tryVerifyToken(token, secret, options) {
    const data = JWT.verify(token, secret, {
      complete: true,
      ...this.options,
      ...options,
    });

    return { data, done: true };
  }

  tokenVerifier(
    token,
    secret = this.getJwtMainSecret(),
    options = this.options
  ) {
    return trier
      .start()
      .try(this.tryVerifyToken.bind(this), token, secret, options)
      .catch((error) => {
        printCatchError(this.tokenVerifier.name, error);
        return {
          error,
          done: false,
        };
      })
      .execute();
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

  getTokenFromRequest(request) {
    const { authorization, Authorization } = request.headers;

    return (authorization || Authorization)?.split("Bearer ")[1];
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
