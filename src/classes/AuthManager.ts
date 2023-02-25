import { trier } from "simple-trier";
import JWT from "jsonwebtoken";

import { envManager } from "@/classes/EnvironmentManager";

import { errors } from "@/variables/errors";
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
    secret = this.getMainSecret(),
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
    secret = this.getMainSecret(),
    options = this.getOptions().jwt
  ) {
    return JWT.sign(data, secret, {
      ...this.getOptions().jwt,
      ...options,
    });
  }

  // getSecret(reqUrl) {
  //   const isAuthenticationUrl = isUrlMatchWithReqUrl(
  //     [routes.auth.verify.fullUrl, routes.auth.createNewUser.fullUrl],
  //     reqUrl
  //   );

  //   const secrets = this.getSecrets();
  //   return isAuthenticationUrl
  //     ? secrets.JWT_SIGN_IN_SECRET
  //     : secrets.JWT_MAIN_SECRET;
  // }

  getTokenFromRequest(req) {
    return req.cookies[this.getOptions().cookie.SESSION_NAME];
  }
  getTokenFromSocket(socket) {
    return socket.handshake.headers.cookie.split(
      `${this.getOptions().cookie.SESSION_NAME}=`
    )[1];
  }
  setTokenToResponse(res, token, options = { httpOnly: true, secure: true }) {
    res.cookie(this.getOptions().cookie.SESSION_NAME, token, options);
  }
  removeSession(res) {
    res.clearCookie(this.getOptions().cookie.SESSION_NAME);
  }

  getSignInSecret() {
    const { JWT_SIGN_IN_SECRET } = envManager.ENVIRONMENT_KEYS;
    return envManager.getEnvironment(JWT_SIGN_IN_SECRET);
  }
  getMainSecret() {
    const { JWT_MAIN_SECRET } = envManager.ENVIRONMENT_KEYS;
    return envManager.getEnvironment(JWT_MAIN_SECRET);
  }
  getSecrets() {
    return {
      //TODO: Rename
      JWT_MAIN_SECRET: this.getMainSecret(),
      JWT_SIGN_IN_SECRET: this.getSignInSecret(),
    };
  }

  getTokenId(token, secret) {
    return authManager.verifyToken(token, secret).data.payload.tokenId;
  }
}

const authManager = new AuthManager();

export { authManager, AuthManager };
