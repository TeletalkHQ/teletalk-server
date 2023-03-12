/* eslint-disable no-var */
import { LoggerChalker } from "logger-chalker";
import { Server } from "socket.io";

import { CustomEmit, CustomOn, CustomUse, VerifiedToken } from "@/types";

declare global {
  var logger: LoggerChalker;
}
export {};

declare module "socket.io" {
  interface Socket {
    authData: VerifiedToken;
    customEmit: CustomEmit;
    customOn: CustomOn;
    customUse: CustomUse;
    io: Server;
  }
}
