import { Trier } from "simple-trier";

import { envManager } from "@/classes/EnvironmentManager";

import { helpers } from "@/helpers";
import { LogLevel } from "@/types";

class AppConfigs {
  private configs = {
    db: {
      MONGO_URL: helpers.getMongoUrl(),
      MONGO_URL_FULL: helpers.contactMongoUrlWithCollectionName(),
    },
  };

  async setup() {
    const { NODE_ENV, LOG_LEVEL } = envManager.getEnvironment();
    logger.setLevel(logger.levels[LOG_LEVEL as LogLevel]);

    if (NODE_ENV.includes("test"))
      Trier.changeGlobalConfigs({
        callerName: "unknownCaller",
        canPrintError: false,
      });
  }

  getConfigs() {
    return this.configs;
  }
}

const appConfigs = new AppConfigs();

export { appConfigs, AppConfigs };
