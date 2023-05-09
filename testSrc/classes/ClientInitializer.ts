//FIXME: Remove http://
import http from "http";

import cookie from "cookie";

import Client, {
  ManagerOptions,
  Socket,
  SocketOptions,
} from "socket.io-client";

import { appConfigs } from "@/classes/AppConfigs";

import { utilities } from "@/utilities";

import { errors } from "@/variables";

const {
  APP: { PORT, HOSTNAME: hostname },
} = appConfigs.getConfigs();

const setClientIdRequestOptions = {
  headers: {
    "Content-Type": "application/json",
  },
  hostname,
  method: "POST",
  path: "/setClientId",
  port: PORT,
};

type PromiseResolve = (value: string | PromiseLike<string>) => void;
type PromiseReject = (reason?: any) => void;
const setClientIdRequestBody =
  //prettier-ignore
  (resolve: PromiseResolve, reject: PromiseReject) =>
    (res: http.IncomingMessage) => {
      const cookies = res.headers["set-cookie"];
      if (!cookies) return reject(errors.cookieIsNotDefined);
      resolve(utilities.extractClientIdFromCookie(cookies[0]));
    };

class ClientInitializer {
  private client: Socket;
  private clientId: string;
  private clientIdCookie: string;

  setClientId(clientId?: any) {
    this.clientId = clientId;
    return this;
  }

  async makeLegalClientId() {
    return await new Promise<string>((resolve, reject) => {
      const req = http.request(
        setClientIdRequestOptions,
        setClientIdRequestBody(resolve, reject)
      );
      req.end();
    });
  }

  create() {
    this.client = Client(this.makeUrl(), this.makeClientSocketOptions());
    return this;
  }

  private makeUrl() {
    return `http://${hostname}:${PORT}`;
  }

  private makeClientSocketOptions() {
    const options: Partial<ManagerOptions & SocketOptions> = {
      autoConnect: false,
      withCredentials: true,
    };

    if (this.clientIdCookie) {
      options.extraHeaders = {
        cookie: this.clientIdCookie,
      };
    }

    return options;
  }
  makeClientIdCookie() {
    this.clientIdCookie = cookie.serialize("clientId", this.clientId, {
      httpOnly: true,
      sameSite: false,
      secure: true,
    });

    return this;
  }

  assignClientId() {
    this.client.clientId = this.clientId;
    return this;
  }

  connect() {
    this.client.connect();
    return this;
  }

  async createComplete() {
    this.clientId = await this.makeLegalClientId();
    this.makeClientIdCookie().create().assignClientId().connect();

    return this;
  }

  getClient() {
    return this.client;
  }

  getClientId() {
    return this.clientId;
  }
}

const clientInitializer = () => new ClientInitializer();

export { clientInitializer, ClientInitializer };
