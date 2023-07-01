import { createNewUser } from "~/websocket/events/auth/handlers/createNewUser";
import { logout } from "~/websocket/events/auth/handlers/logout";
import { signIn } from "~/websocket/events/auth/handlers/signIn";
import { verify } from "~/websocket/events/auth/handlers/verify";

export const authHandlers = {
  createNewUser,
  logout,
  signIn,
  verify,
};
