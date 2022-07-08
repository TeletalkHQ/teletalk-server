const Redis = require("ioredis");

const { errorThrower } = require("@/functions/utilities/utils");

const redis = new Redis();

class StateManager {
  constructor() {
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
    Object.keys(this.state).forEach((key) => {
      redis.set(key, (error, result) => {
        if (!error) {
          this.state[key] = JSON.parse(result);
        }
      });
    });
  }

  async getStateStringifiedValue(key) {
    try {
      return await redis.get(key);
    } catch (error) {
      logger.log("getState catch, error", error);
      errorThrower(error, error);
    }
  }

  async getState(key) {
    try {
      const value = await this.getStateStringifiedValue(key);

      return JSON.parse(value);
    } catch (error) {
      logger.log("getStateObject catch, error", error);
      errorThrower(error, error);
    }
  }

  async setStateWithStringifiedValue(key, value) {
    await redis.set(key, value);

    return { done: true };
  }

  async setState(key, newState) {
    this.state[key] = newState;
    const stringifiedNewState = JSON.stringify(newState);
    await this.setStateWithStringifiedValue(key, stringifiedNewState);

    return { done: true };
  }
}

const stateManager = new StateManager();

module.exports = { stateManager, StateManager };
