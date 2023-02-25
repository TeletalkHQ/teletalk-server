import { EventManager as EventManagerMain } from "utility-store/src/classes/EventManager";

class EventManager extends EventManagerMain {
  constructor() {
    super();
  }
}

const eventManager = new EventManager();

export { eventManager };
