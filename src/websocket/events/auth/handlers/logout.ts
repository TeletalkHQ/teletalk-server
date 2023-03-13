import { authManager } from "@/classes/AuthManager";

import { services } from "@/services";

import { SocketHandler } from "@/types";

const logout: SocketHandler = async (socket) => {
  const { currentUserId } = socket;
  const currentToken = authManager.getTokenFromSocket(socket) as string;

  await services.logout({
    currentToken,
    currentUserId,
  });

  authManager.removeSession(socket);

  socket.handshake.headers.cookie = undefined;
};

export { logout };
