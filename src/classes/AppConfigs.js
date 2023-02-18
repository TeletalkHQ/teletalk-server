const { Trier } = require("simple-trier");

const { envManager } = require("@/classes/EnvironmentManager");

const { helpers } = require("@/helpers");

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

module.exports = {
  appConfigs,
  AppConfigs,
};
