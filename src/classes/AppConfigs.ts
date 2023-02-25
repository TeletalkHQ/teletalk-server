import { Trier, trier } from "simple-trier";

import { envManager } from "@/classes/EnvironmentManager";

import { helpers } from "@/helpers";

class AppConfigs {
  #configs = {
    db: {
      MONGO_URL: helpers.getMongoUrl(),
      MONGO_URL_FULL: helpers.contactMongoUrlWithCollectionName(),
    },
  };

  async runConfigs() {
    const { NODE_ENV, LOGGER_LEVEL } = envManager.getAllLocalEnvironments();

    logger.setLevel(logger.levels[LOGGER_LEVEL]);

    if (NODE_ENV.includes("test"))
      Trier.changeGlobalConfigs({
        canPrintError: false,
      });
  }

  getConfigs() {
    return this.#configs;
  }
}

const appConfigs = new AppConfigs();

export { appConfigs, AppConfigs };
