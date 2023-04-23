import { userServices } from "$/services/user";
import { privateChatServices } from "$/services/privateChat";

const services = { ...userServices, ...privateChatServices };

export { services };
