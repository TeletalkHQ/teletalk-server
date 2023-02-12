import { request, response } from "express";
import { LoggerChalker } from "logger-chalker";
import socketIo from "socket.io";

declare global {
  const logger = new LoggerChalker();
  const expressResponse = response;
  const expressRequest = request;
  const socketIntellisense = new socketIo.Socket();
  const ioIntellisense = new socketIo.Server();
}
