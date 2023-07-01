import { SocketOnHandler } from "~/types";

//CLEANME: Remove
export const disconnect: SocketOnHandler = (socket) => {
  socket.disconnect();
};
