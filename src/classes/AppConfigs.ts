import { Trier } from "simple-trier";

import { envManager } from "@/classes/EnvironmentManager";

import { helpers } from "@/helpers";

const { PORT } = envManager.getEnvironment();
// const RANDOM_PORT = randomMaker.numberWithRange(8000, 10000);

class AppConfigs {
  private configs = {
    db: {
      MONGO_URL: helpers.getMongoUrl(),
      MONGO_URL_FULL: helpers.makeMongoFullUrl(),
    },
    server: { PORT, HOSTNAME: "localhost" },
  };

  setup() {
    const { NODE_ENV, LOG_LEVEL } = envManager.getEnvironment();
    logger.setLevel(logger.levels[LOG_LEVEL]);

    if (NODE_ENV.includes("test"))
      Trier.changeGlobalConfigs({
        callerName: "unknownCaller",
        canPrintError: true,
      });
  }

  getConfigs() {
    return this.configs;
  }
}

const appConfigs = new AppConfigs();

export { appConfigs, AppConfigs };
