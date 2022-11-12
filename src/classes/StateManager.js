const Redis = require("ioredis");
const {
  objectUtilities,
} = require("utility-store/src/classes/ObjectUtilities");

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
      aliveClients: [],
      temporaryClients: {
        aliveClients: [],
      },
      testUsers: {},
      users: [],
    };

    this.stateKeys = {
      aliveClients: "aliveClients",
      temporaryClients: "temporaryClients",
      testUsers: "testUsers",
      users: "users",
    };

    this.initializeStates();
  }

  initializeStates() {
    objectUtilities.objectKeys(this.state).forEach((key) => {
      this.storage.set(key, (error, result) => {
        if (!error) {
          this.state[key] = JSON.parse(result);
        }
      });
    });
  }

  async getStateStringifiedValue(key) {
    return this.storage.get(key);
  }

  async getState(key) {
    const value = await this.getStateStringifiedValue(key);
    return JSON.parse(value);
  }

  async setStateWithStringifiedValue(key, value) {
    await this.storage.set(key, value);
    return { ok: true };
  }

  async setState(key, newState) {
    this.state[key] = newState;
    const stringifiedNewState = JSON.stringify(newState);
    await this.setStateWithStringifiedValue(key, stringifiedNewState);
    return { ok: true };
  }
}

const stateManager = new StateManager();

module.exports = { stateManager, StateManager };
