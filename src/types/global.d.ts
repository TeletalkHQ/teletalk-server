/* eslint-disable no-var */
import { LoggerChalker } from "logger-chalker";

declare global {
  var logger: LoggerChalker;

  var Config: {
    Foo: string;
  };
  var Foo: string;
}
export {};
