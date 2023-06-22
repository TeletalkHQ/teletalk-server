import { privateChatServices } from "@/services/privateChat";
import { userServices } from "@/services/user";

const services = { ...userServices, ...privateChatServices };

export { services };
