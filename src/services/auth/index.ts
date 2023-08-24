import { createNewUser } from "~/services/auth/createNewUser";
import { logout } from "~/services/auth/logout";

export const authServices = {
	createNewUser,
	logout,
};
