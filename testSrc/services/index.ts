import { services as mainServices } from "~/services";

import { privateChatServices } from "@/services/privateChat";
import { userServices } from "@/services/user";

const mergedServices = {
	...mainServices.privateChat,
	...mainServices.user,
} as const;

export const services = {
	...userServices,
	...privateChatServices,
	...mergedServices,
};
