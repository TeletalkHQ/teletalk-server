import { SocketOnHandler } from "~/types";

//CLEANME: Remove
const disconnect: SocketOnHandler = (socket) => {
  socket.disconnect();
};

export { disconnect };
