import { request, response } from "express";
import { LoggerChalker } from "logger-chalker";

declare global {
  const logger = new LoggerChalker();
  const expressResponse = response;
  const expressRequest = request;
}
