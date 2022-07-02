const Events = require("events");

const events = new Events();

class EventEmitter {
  constructor() {
    this.events = {};
    this.eventKeys = {
      requirementsGetDone: "requirementsGetDone",
    };
  }

  emitEvent({ event, ...args }) {
    events.emit(event, args);
  }

  addListener({ event, listener }) {
    // this.events[event] = {
    //   ...this.events[event],
    //   listeners: [...this.events[event]?.listeners, listener],
    // };

    this.events[event] = { eventName: event, listener };

    events.on(event, listener);
  }

  removeListener({ event }) {
    const e = this.events[event];

    if (e) {
      delete this.events[event];
    }
  }
}

const eventEmitter = new EventEmitter();

module.exports = { eventEmitter };
