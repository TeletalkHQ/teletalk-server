class AppOptions {
  #options = {
    eventKeys: {
      requirementsGetDone: "requirementsGetDone",
    },
    stateKeys: {
      temporaryClients: "temporaryClients",
    },
  };

  getOptions() {
    return this.#options;
  }

  getEventEmitterEvents() {
    const options = this.getOptions();
    return options.EVENT_EMITTER_EVENTS;
  }
}

const appOptions = new AppOptions();

module.exports = { appOptions, AppOptions };
