import { chatServices } from "./privateChat/custom";
import { userServices } from "./user/custom";

export const services = {
	privateChat: chatServices,
	user: userServices,
};
