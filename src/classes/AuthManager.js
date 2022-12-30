const { trier } = require("utility-store/src/classes/Trier");
const JWT = require("jsonwebtoken");

const { envManager } = require("@/classes/EnvironmentManager");

const { isUrlMatchWithReqUrl } = require("@/utilities/utilities");

const { routes } = require("@/routes");

class AuthManager {
  #options = { algorithm: "HS256" };

  verifyToken(
    token,
    secret = this.getJwtMainSecret(),
    options = this.#options
  ) {
    return trier(this.verifyToken.name)
      .try(this.#tryVerifyToken.bind(this), token, secret, options)
      .catch((error) => {
        return {
          error,
          ok: false,
        };
      })
      .run();
  }
  #tryVerifyToken(token, secret, options) {
    const data = JWT.verify(token, secret, {
      complete: true,
      ...this.#options,
      ...options,
    });

    return { data, ok: true };
  }

  signToken(data, secret = this.getJwtMainSecret(), options = this.#options) {
    return JWT.sign(data, secret, {
      ...this.#options,
      ...options,
    });
  }

  getSecret(reqUrl) {
    const isAuthenticationUrl = isUrlMatchWithReqUrl(
      [routes.user.verify.fullUrl, routes.user.createNewUser.fullUrl],
      reqUrl
    );

    return isAuthenticationUrl
      ? this.getJwtSignInSecret()
      : this.getJwtMainSecret();
  }

  getTokenFromRequest(request) {
    const authorization = this.getAuthorizationHeader(request);
    return this.extractTokenFromAuthorization(authorization);
  }
  getAuthorizationHeader(request) {
    const { authorization, Authorization } = request.headers;
    return authorization || Authorization;
  }
  extractTokenFromAuthorization(authorization) {
    return authorization?.split("Bearer ").at(1);
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
