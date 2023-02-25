const {
  EventManager: EventManagerMain,
} = require("utility-store/src/classes/EventManager");

class EventManager extends EventManagerMain {
  constructor() {
    super();
  }
}

const eventManager = new EventManager();

module.exports = { eventManager };
