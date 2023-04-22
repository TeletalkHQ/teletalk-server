import JWT from "jsonwebtoken";
import { trier } from "simple-trier";

import { envManager } from "@/classes/EnvironmentManager";

import { VerifiedSession } from "@/types";

import { utilities } from "@/utilities";

import { errors } from "@/variables/errors";

import { routes } from "@/websocket/events";

class AuthManager {
  private options = {
    SESSION_NAME: "SESSION",
  };

  getOptions() {
    return this.options;
  }

  verify(session: string, secret = this.getMainSecret()) {
    return trier(this.verify.name)
      .try(
        () => {
          const data = JWT.verify(session, secret, {
            complete: true,
            algorithms: ["HS256"],
          });

          return { data };
        },
        session,
        secret
      )
      .catch((error) => {
        return {
          ...errors.SESSION_INVALID,
          sessionError: error,
        };
      })
      .throw()
      .run() as VerifiedSession;
  }

  signSession<T extends object>(data: T, secret = this.getMainSecret()) {
    return JWT.sign(data, secret, {
      algorithm: "HS256",
    });
  }

  getSecret(eventName: string) {
    const isAuthenticationUrl = utilities.isEventNameMatch(
      [routes.verify.name, routes.createNewUser.name],
      eventName
    );

    const secrets = this.getSecrets();
    return isAuthenticationUrl
      ? secrets.SESSION_SIGN_IN_SECRET
      : secrets.SESSION_MAIN_SECRET;
  }

  getSecrets() {
    return {
      SESSION_MAIN_SECRET: this.getMainSecret(),
      SESSION_SIGN_IN_SECRET: this.getSignInSecret(),
    };
  }
  getMainSecret() {
    return envManager.getEnvironment().SESSION_MAIN_SECRET;
  }
  getSignInSecret() {
    return envManager.getEnvironment().SESSION_SIGN_IN_SECRET;
  }

  getSessionId(session: string, secret: string = this.getMainSecret()) {
    return this.verify(session, secret).data.payload.sessionId;
  }
}

const authManager = new AuthManager();

export { authManager, AuthManager };
