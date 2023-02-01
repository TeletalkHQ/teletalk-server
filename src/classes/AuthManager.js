const { trier } = require("utility-store/src/classes/Trier");
const JWT = require("jsonwebtoken");

const { envManager } = require("@/classes/EnvironmentManager");

const { isUrlMatchWithReqUrl } = require("@/utilities/utilities");

const { routes } = require("@/routes");

const { errors } = require("@/variables/errors");

class AuthManager {
  #options = {
    jwt: {
      algorithm: "HS256",
    },
    cookie: {
      SESSION_NAME: "SESSION",
    },
  };

  getOptions() {
    return this.#options;
  }

  verifyToken(
    token,
    secret = this.getJwtMainSecret(),
    options = this.getOptions().jwt
  ) {
    return trier(this.verifyToken.name)
      .try(this.#tryVerifyToken.bind(this), token, secret, options)
      .catch((error) => {
        return {
          ...errors.TOKEN_INVALID,
          tokenError: error,
        };
      })
      .throw()
      .run();
  }
  #tryVerifyToken(token, secret, options) {
    const data = JWT.verify(token, secret, {
      complete: true,
      ...this.getOptions().jwt,
      ...options,
    });

    return { data };
  }

  signToken(
    data,
    secret = this.getJwtMainSecret(),
    options = this.getOptions().jwt
  ) {
    return JWT.sign(data, secret, {
      ...this.getOptions().jwt,
      ...options,
    });
  }

  getSecret(reqUrl) {
    const isAuthenticationUrl = isUrlMatchWithReqUrl(
      [routes.auth.verify.fullUrl, routes.auth.createNewUser.fullUrl],
      reqUrl
    );

    const secrets = this.getJwtSecrets();
    return isAuthenticationUrl
      ? secrets.JWT_SIGN_IN_SECRET
      : secrets.JWT_MAIN_SECRET;
  }

  getTokenFromRequest(req = expressRequest) {
    return req.cookies[this.getOptions().cookie.SESSION_NAME];
  }
  setTokenToResponse(res, token, options = { httpOnly: true, secure: true }) {
    res.cookie(this.getOptions().cookie.SESSION_NAME, token, options);
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
