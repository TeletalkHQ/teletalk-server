class StateManager {
  constructor() {
    this.storage = () => {};
    this.state = {
      temporaryClients: "[]",
    };
  }
  setStorage(storage) {
    this.storage = storage;
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
