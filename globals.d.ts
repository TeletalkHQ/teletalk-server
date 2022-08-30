import { request, response } from "express";
import { LoggerNode } from "utility-store/src/classes/LoggerNode";

const loggerInstance = new LoggerNode();

declare global {
  const logger = loggerInstance;
  const expressResponse = response;
  const expressRequest = request;
}
