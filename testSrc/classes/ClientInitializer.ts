import cookie from "cookie";
import http from "http";

import Client from "socket.io-client";

import { appConfigs } from "@/classes/AppConfigs";

import { errors } from "@/variables/errors";

const {
  server: { exactPort, hostname },
} = appConfigs.getConfigs();

class ClientInitializer {
  async createClient() {
    const clientId = await this.getClientId();
    const options = this.makeClientSocketOptions(clientId);
    //FIXME: Remove http://
    const url = `http://${hostname}:${exactPort}`;
    const client = Client(url, options);
    client.connect();
    return client;
  }

  private async getClientId() {
    const options = this.getSetClientIdOptions();

    return await new Promise<string>((resolve, reject) => {
      const req = http.request(options, (res) => {
        const cookies = res.headers["set-cookie"];
        if (!cookies) return reject(errors.COOKIES_ARE_UNDEFINED);

        const clientIdCookie = cookies[0];

        const [rawCookie] = clientIdCookie.split("; ");
        const [, value] = rawCookie.split("=");

        resolve(value);
      });
      req.end();
    });
  }

  private getSetClientIdOptions() {
    return {
      hostname,
      port: exactPort,
      path: "/setClientId",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  private makeClientSocketOptions(clientId: string) {
    return {
      autoConnect: false,
      withCredentials: true,
      extraHeaders: {
        cookie: cookie.serialize("clientId", clientId, {
          httpOnly: true,
          sameSite: false,
          secure: true,
        }),
      },
    };
  }
}

const clientInitializer = new ClientInitializer();

export { clientInitializer };
