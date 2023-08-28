import { chatServices } from "~/services/chat";
import { commonServices } from "~/services/common";
import { userServices } from "~/services/user";

export const services = {
	...chatServices,
	...commonServices,
	...userServices,
};
