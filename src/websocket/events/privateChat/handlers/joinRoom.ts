import { JoinRoomIO, SocketOnHandler } from "~/types";

const joinRoom: SocketOnHandler<JoinRoomIO> = (socket) => {
  socket.join(socket.userId);

  return { data: {} };
};

export { joinRoom };
