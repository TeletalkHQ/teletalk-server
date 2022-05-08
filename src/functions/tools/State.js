const Redis = require("ioredis");

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
      throw error;
    }
  }

  async getStateObject(key) {
    try {
      const value = await redis.get(key);

      return JSON.parse(value);
    } catch (error) {
      logger.log("getStateObject catch, error", error);
      throw error;
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
