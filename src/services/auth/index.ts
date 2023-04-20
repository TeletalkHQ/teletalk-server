import { createNewUser } from "@/services/auth/createNewUser";
import { logout } from "@/services/auth/logout";

const authServices = {
  createNewUser,
  logout,
};

export { authServices };
