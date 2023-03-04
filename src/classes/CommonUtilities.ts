import { envManager } from "@/classes/EnvironmentManager";

class CommonUtilities {
  isProduction() {
    const NODE_ENV = envManager.getNodeEnv();
    return NODE_ENV === "production" || NODE_ENV === "production_local";
  }
}

const commonUtilities = new CommonUtilities();

export { commonUtilities, CommonUtilities };
