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
    const level: string = LOG_LEVEL;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    logger.setLevel(logger.levels[level]);

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
