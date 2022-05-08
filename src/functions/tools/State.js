const Redis = require("ioredis");
const { errorThrower } = require("@/functions/utilities/utilsNoDeps");

const redis = new Redis();

class State {
  constructor() {
    this.state = {};
  }

  async getState(key) {
    try {
      const value = await redis.get(key);

      return value;
    } catch (error) {
      logger.log("getState catch, error", error);
      errorThrower(error, error);
    }
  }

  async getStateObject(key) {
    try {
      const value = await redis.get(key);

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

  async setStateObject(key, value) {
    await redis.set(key, JSON.stringify(value));

    return { done: true };
  }
}

const state = new State();

module.exports = { state };
