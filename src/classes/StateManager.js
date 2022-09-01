const Redis = require("ioredis");

class StateManager {
  constructor() {
    this.storage = new Redis();

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
