import { createNewUser } from "~/socket/events/auth/handlers/createNewUser";
import { logout } from "~/socket/events/auth/handlers/logout";
import { signIn } from "~/socket/events/auth/handlers/signIn";
import { verify } from "~/socket/events/auth/handlers/verify";

export const handlers = {
  createNewUser,
  logout,
  signIn,
  verify,
};
