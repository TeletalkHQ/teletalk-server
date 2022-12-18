const { trier } = require("utility-store/src/classes/Trier");
const JWT = require("jsonwebtoken");

const { envManager } = require("@/classes/EnvironmentManager");

const { isUrlMatchWithReqUrl } = require("@/utilities/utilities");

const { routes } = require("@/routes");

class AuthManager {
  constructor() {
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
    return trier(this.tokenVerifier.name)
      .try(this.tryVerifyToken, token, secret, options)
      .catch((error) => {
        return {
          error,
          ok: false,
        };
      })
      .result();
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
    return trier(this.tokenSigner.name)
      .try(this.trySignToken, data, secret, options)
      .printAndThrow()
      .result();
  }

  getSecretWithUrlCondition(reqUrl) {
    const isVerificationUrl = isUrlMatchWithReqUrl(
      [routes.user.verifySignIn.fullUrl, routes.user.createNewUser.fullUrl],
      reqUrl
    );

    return isVerificationUrl
      ? this.getJwtSignInSecret()
      : this.getJwtMainSecret();
  }

  getTokenFromRequest(request) {
    const { authorization, Authorization } = request.headers;
    //TODO: Throw error if authorization not exist
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
