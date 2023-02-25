import { authManager } from "@/classes/AuthManager";

import { services } from "@/services";

const logout = async (socket) => {
  const { currentUserId } = socket;
  const currentToken = authManager.getTokenFromRequest(socket);

  await services.logout().run({
    currentToken,
    currentUserId,
  });

  authManager.removeSession(socket);

  socket.handshake.headers.cookie = undefined;
};

export { logout };
