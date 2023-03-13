import { SocketOnHandler } from "@/types";

const disconnect: SocketOnHandler = (socket) => {
  socket.disconnect();
};

export { disconnect };
