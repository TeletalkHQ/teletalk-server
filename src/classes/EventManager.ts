import { EventManager as EventManagerMain } from "utility-store";

class EventManager extends EventManagerMain {
  constructor() {
    super();
  }
}

const eventManager = new EventManager();

export { eventManager };
