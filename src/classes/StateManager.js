const Redis = require("ioredis");
const { errorThrower } = require("@/functions/utilities/utils");

const redis = new Redis();

class StateManager {
  constructor() {
    this.state = {
      temporaryClients: {
        aliveClients: [],
      },
      aliveClients: [],
      users: [],
      testUsers: {},
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

  async getState(key) {
    try {
      return await redis.get(key);
    } catch (error) {
      logger.log("getState catch, error", error);
      errorThrower(error, error);
    }
  }

  async getStateObject(key) {
    try {
      const value = await this.getState(key);

      return JSON.parse(value);
    } catch (error) {
      logger.log("getStateObject catch, error", error);
      errorThrower(error, error);
    }
  }

  async setState(key, value) {
    await redis.set(key, value);

    return { done: true };
  }

  async setStateObject(key, newState) {
    this.state[key] = newState;
    await this.setState(key, JSON.stringify(newState));

    return { done: true };
  }
}

const stateManager = new StateManager();

module.exports = { stateManager, StateManager };
