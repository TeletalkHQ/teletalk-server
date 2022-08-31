const { trier } = require("utility-store/src/classes/Trier");
const JWT = require("jsonwebtoken");

const { envManager } = require("@/classes/EnvironmentManager");

const { isUrlMatchWithReqUrl } = require("@/functions/utilities/utils");

const {
  userRoutes: { createNewUserRoute, verifySignInNormalRoute },
} = require("@/variables/routes/userRoutes");

class AuthManager {
  constructor() {
    //FIXME Is this should change by dev's ?
    this.options = { algorithm: "HS256" };
    this.tryVerifyToken = this.tryVerifyToken.bind(this);
    this.trySignToken = this.trySignToken.bind(this);
  }

  tryVerifyToken(token, secret, options) {
    const data = JWT.verify(token, secret, {
      complete: true,
      ...this.options,
      ...options,
    });

    return { data, ok: true };
  }

  tokenVerifier(
    token,
    secret = this.getJwtMainSecret(),
    options = this.options
  ) {
    return trier
      .start()
      .setOptions(this.tokenVerifier.name)
      .try(this.tryVerifyToken, token, secret, options)
      .catch((error) => {
        return {
          error,
          ok: false,
        };
      }).result;
  }

  trySignToken(data, secret, options) {
    return JWT.sign(data, secret, {
      ...this.options,
      ...options,
    });
  }
  async tokenSigner(
    data,
    secret = this.getJwtMainSecret(),
    options = this.options
  ) {
    return trier
      .start()
      .setOptions(this.tokenSigner.name)
      .try(this.trySignToken, data, secret, options)
      .throw().result;
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
