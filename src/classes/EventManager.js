const {
  EventManager: EventManagerMain,
} = require("utility-store/src/classes/EventManager");

class EventManager extends EventManagerMain {
  constructor() {
    super();
    this.eventKeys = {
      setRequirementsGetDone: "requirementsGetDone",
    };
  }
}

const eventManager = new EventManager();

module.exports = { eventManager };
