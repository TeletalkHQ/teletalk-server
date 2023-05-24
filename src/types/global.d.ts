import { LoggerChalker } from "logger-chalker";
import { Server } from "socket.io";

import {
  CustomEmit,
  CustomOn,
  CustomUse,
  Environments,
  AuthClient,
} from "@/types";

declare global {
  // eslint-disable-next-line no-var
  var logger: LoggerChalker;
}

declare module "socket.io" {
  interface Socket {
    clientId: string;
    customEmit: CustomEmit;
    customOn: CustomOn;
    customUse: CustomUse;
    io: Server;
    authClient: AuthClient;
    userId: string;
    clientStr: string;
  }
}

declare module "socket.io-client" {
  interface Socket {
    clientId: string;
  }
}

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends Environments {}
  }
}

export {};
