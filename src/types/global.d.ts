/* eslint-disable no-var */
import { LoggerChalker } from "logger-chalker";

declare global {
  var logger: LoggerChalker;
}
export {};

declare module "socket.io" {
  interface Socket {
    customEmit(event: string, data: any): void;

    customOn(
      event: string,
      callback: (...args: any[]) => Promise<void | object>
    ): void;

    customUse(
      middleware: (...args: any[]) => Promise<void> | void,
      ...args: any[]
    ): void;
  }
}
