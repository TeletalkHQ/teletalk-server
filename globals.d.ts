import { request, response } from "express";
import { LoggerChalker } from "logger-chalker";
import { Socket } from "socket.io";

declare global {
  const logger = new LoggerChalker();
  const expressResponse = response;
  const expressRequest = request;
  const ioSocket = new Socket();
}
