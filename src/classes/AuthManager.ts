import JWT from "jsonwebtoken";
import { Socket } from "socket.io";
import { trier } from "simple-trier";

import { envManager } from "@/classes/EnvironmentManager";

import { VerifiedToken } from "@/types";

import { errors } from "@/variables/errors";
class AuthManager {
  private options = {
    cookie: {
      SESSION_NAME: "SESSION",
    },
  };

  getOptions() {
    return this.options;
  }

  verifyToken(token: string, secret = this.getMainSecret()) {
    return trier(this.verifyToken.name)
      .try(
        () => {
          const data = JWT.verify(token, secret, {
            complete: true,
            algorithms: ["HS256"],
          });

          return { data };
        },
        token,
        secret
      )
      .catch((error) => {
        return {
          ...errors.TOKEN_INVALID,
          tokenError: error,
        };
      })
      .throw()
      .run() as VerifiedToken;
  }

  signToken<T extends object>(data: T, secret = this.getMainSecret()) {
    return JWT.sign(data, secret, {
      algorithm: "HS256",
    });
  }

  // getSecret(reqUrl) {
  //   const isAuthenticationUrl = isUrlMatchWithReqUrl(
  //     [routes.auth.verify.fullUrl, routes.auth.createNewUser.fullUrl],
  //     reqUrl
  //   );

  //   const secrets = this.getSecrets();
  //   return isAuthenticationUrl
  //     ?  secrets.SESSION_SIGN_IN_SECRET
  //     : secrets.SESSION_MAIN_SECRET;
  // }

  // getTokenFromRequest(req) {
  //   return req.cookies[this.getOptions().cookie.SESSION_NAME];
  // }

  getTokenFromSocket(socket: Socket) {
    return socket.handshake.headers.cookie?.split(
      `${this.getOptions().cookie.SESSION_NAME}=`
    )[1];
  }
  setSessionOnSocket(
    socket: Socket,
    token: string
    //FIXME: Options need to set
    // options = { httpOnly: true, secure: true }
  ) {
    socket.handshake.headers["set-cookie"] = [
      `${this.getOptions().cookie.SESSION_NAME}=${token}`,
    ];
    // (this.getOptions().cookie.SESSION_NAME, token, options);
  }
  removeSession(socket: Socket) {
    socket.handshake.headers.cookie = "";
    // clearCookie(this.getOptions().cookie.SESSION_NAME);
  }

  getSignInSecret() {
    return envManager.getEnvironment().SESSION_SIGN_IN_SECRET;
  }
  getMainSecret() {
    return envManager.getEnvironment().SESSION_MAIN_SECRET;
  }
  getSecrets() {
    return {
      //TODO: Rename
      SESSION_MAIN_SECRET: this.getMainSecret(),
      SESSION_SIGN_IN_SECRET: this.getSignInSecret(),
    };
  }

  getTokenId(token: string, secret: string) {
    return this.verifyToken(token, secret).data.payload.tokenId;
  }
}

const authManager = new AuthManager();

export { authManager, AuthManager };
