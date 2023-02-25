import { getCountries } from "@/websocket/events/other/handlers/getCountries";
import { getStuff } from "@/websocket/events/other/handlers/getStuff";
import { getWelcomeMessage } from "@/websocket/events/other/handlers/getWelcomeMessage";
import { logEvent } from "@/websocket/events/other/handlers/logEvent";
import { ping } from "@/websocket/events/other/handlers/ping";

const otherHandlers = {
  getCountries,
  getStuff,
  getWelcomeMessage,
  logEvent,
  ping,
};

export { otherHandlers };
