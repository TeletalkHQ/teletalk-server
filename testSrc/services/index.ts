import { privateChatServices } from "@/services/privateChat";
import { userServices } from "@/services/user";

export const services = { ...userServices, ...privateChatServices };
