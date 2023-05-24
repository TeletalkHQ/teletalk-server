import { SignJWT, jwtVerify } from "jose";
import { randomMaker } from "utility-store";

import { appConfigs } from "@/classes/AppConfigs";

import { models } from "@/models";
import { AuthClient } from "@/types";

class ClientManager {
  private options = {};

  getOptions() {
    return this.options;
  }

  signClient(id?: string) {
    return new SignJWT({
      clientId: id ?? randomMaker.id(models.native.clientId.maxLength),
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .sign(this.getEncodedSecret());
  }

  verifyClient(client: string) {
    return jwtVerify(client, this.getEncodedSecret()) as Promise<AuthClient>;
  }

  private getEncodedSecret() {
    return this.encodeString(appConfigs.getConfigs().APP.CLIENT_SECRET);
  }

  private encodeString(str: string) {
    return new TextEncoder().encode(str);
  }
}

export const clientManager = new ClientManager();
