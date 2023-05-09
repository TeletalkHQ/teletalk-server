import { SocketOnHandler } from "@/types";

const joinRoom: SocketOnHandler = (socket) => socket.join(socket.userId);

export { joinRoom };
