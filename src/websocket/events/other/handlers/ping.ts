import { PingIO, SocketOnHandler } from "~/types";

const ping: SocketOnHandler<PingIO> = (socket) => {
  return { data: { pong: `ping request from socketId:${socket.id}` } };
};

export { ping };
