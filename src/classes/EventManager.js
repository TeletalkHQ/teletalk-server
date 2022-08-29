const {
  EventManager: EventManagerMain,
} = require("utility-store/src/classes/EventManager");

class EventManager extends EventManagerMain {
  constructor() {
    super();
    this.events = {};
    this.eventKeys = {
      requirementsGetDone: "requirementsGetDone",
    };
  }
}

const eventManager = new EventManager();

module.exports = { eventManager };
