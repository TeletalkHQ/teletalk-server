import { SocketOnHandler } from "~/types";

const ping: SocketOnHandler = (socket) => {
  return { data: { pong: `ping request from socketId:${socket.id}` } };
};

export { ping };
