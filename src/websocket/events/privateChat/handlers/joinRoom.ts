import { JoinRoomIO, SocketOnHandler } from "~/types";

export const joinRoom: SocketOnHandler<JoinRoomIO> = (socket) => {
  socket.join(socket.userId);

  return { data: {} };
};
