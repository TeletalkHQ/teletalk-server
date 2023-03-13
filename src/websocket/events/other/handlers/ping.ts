import { SocketOnHandler } from "@/types";

const ping: SocketOnHandler = (socket) => {
  return { pong: `ping request from socketId:${socket.id}` };
};

export { ping };
