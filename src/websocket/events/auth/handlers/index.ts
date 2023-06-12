import { SocketHandlerPicker } from "~/types";
import { createNewUser } from "~/websocket/events/auth/handlers/createNewUser";
import { logout } from "~/websocket/events/auth/handlers/logout";
import { signIn } from "~/websocket/events/auth/handlers/signIn";
import { verify } from "~/websocket/events/auth/handlers/verify";

type AuthHandlers = SocketHandlerPicker<
  "createNewUser" | "logout" | "signIn" | "verify"
>;

const authHandlers: AuthHandlers = {
  createNewUser,
  logout,
  signIn,
  verify,
};

export { authHandlers };
