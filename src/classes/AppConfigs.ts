import { Trier } from "simple-trier";

import { envManager } from "@/classes/EnvironmentManager";

import { helpers } from "@/helpers";
import { LogLevel } from "@/types";

const { PORT, PORT_DEFAULT } = envManager.getEnvironment();

const exactPort = PORT || PORT_DEFAULT;

class AppConfigs {
  private configs = {
    db: {
      MONGO_URL: helpers.getMongoUrl(),
      MONGO_URL_FULL: helpers.makeMongoFullUrl(),
    },
    server: { exactPort },
  };

  async setup() {
    const { NODE_ENV, LOG_LEVEL } = envManager.getEnvironment();
    logger.setLevel(logger.levels[LOG_LEVEL as LogLevel]);

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
