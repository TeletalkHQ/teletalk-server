import { services as mainServices } from "~/services";

import { privateChatServices } from "@/services/privateChat";
import { userServices } from "@/services/user";

export const services = {
	user: {
		...userServices,
		...mainServices.user,
	},
	privateChat: {
		...privateChatServices,
		...mainServices.privateChat,
	},
};

export const mergedServices = {
	...services.privateChat,
	...services.user,
};
