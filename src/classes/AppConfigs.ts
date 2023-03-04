import { Trier } from "simple-trier";

import { envManager } from "@/classes/EnvironmentManager";

import { helpers } from "@/helpers";

class AppConfigs {
  private configs = {
    db: {
      MONGO_URL: helpers.getMongoUrl(),
      MONGO_URL_FULL: helpers.contactMongoUrlWithCollectionName(),
    },
  };

  async setup() {
    const { NODE_ENV, LOG_LEVEL } = envManager.getAllLocalEnvironments();

    logger.setLevel(logger.levels[LOG_LEVEL]);

    if (NODE_ENV.includes("test"))
      Trier.changeGlobalConfigs({
        canPrintError: false,
        callerName: "unknownCaller",
      });
  }

  getConfigs() {
    return this.configs;
  }
}

const appConfigs = new AppConfigs();

export { appConfigs, AppConfigs };
