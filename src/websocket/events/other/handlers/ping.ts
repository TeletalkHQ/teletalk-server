import { PingIO, SocketOnHandler } from "~/types";

export const ping: SocketOnHandler<PingIO> = (socket) => {
  return { data: { pong: `ping request from socketId:${socket.id}` } };
};
