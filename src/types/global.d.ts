/* eslint-disable no-var */
import { LoggerChalker } from "logger-chalker";
import { Server } from "socket.io";

import { CustomEmit, CustomOn, CustomUse, Verified } from "@/types";

declare global {
  var logger: LoggerChalker;
}

declare module "socket.io" {
  interface Socket {
    authData: Verified;
    clientId: string;
    currentUserId: string;
    customEmit: CustomEmit;
    customOn: CustomOn;
    customUse: CustomUse;
    io: Server;
  }
}

declare module "socket.io-client" {
  interface Socket {
    clientId: string;
  }
}

export {};
