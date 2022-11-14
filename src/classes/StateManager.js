const Redis = require("ioredis");

const { envManager } = require("@/classes/EnvironmentManager");

//? This is actually redis tcp url from docker!
const REDIS_PORT = envManager.getEnvironment(
  envManager.ENVIRONMENT_KEYS.REDIS_PORT
);
const REDIS_DEFAULT_PORT = envManager.getEnvironment(
  envManager.ENVIRONMENT_KEYS.REDIS_DEFAULT_PORT
);
const EXACT_REDIS_PORT = REDIS_PORT || REDIS_DEFAULT_PORT;

const storage = new Redis(EXACT_REDIS_PORT);

storage.on("connect", () =>
  logger.info(`Redis is connected on port ${EXACT_REDIS_PORT}`)
);
storage.on("error", (error) => logger.error(error));

class StateManager {
  constructor() {
    this.storage = storage;
    this.state = {
      temporaryClients: "[]",
    };
  }

  async initializeStates() {
    for (const key in this.state) {
      const prevStateItem = await this.storage.get(key);
      await this.storage.set(key, prevStateItem || this.state[key]);
    }
  }

  stringify(value) {
    return JSON.stringify(value);
  }
  parse(value) {
    return JSON.parse(value);
  }

  async getState(key) {
    return await this.storage.get(key);
  }
  async getStateAndParse(key) {
    return this.parse(await this.getState(key));
  }

  async setState(key, newState) {
    await this.storage.set(key, newState);
  }
  async setStringifyState(key, newState) {
    await this.setState(key, this.stringify(newState));
  }
}

const stateManager = new StateManager();

module.exports = { stateManager, StateManager };
