import { getAllStuff } from "@/websocket/events/other/handlers/getStuff";
import { getCountries } from "@/websocket/events/other/handlers/getCountries";
import { getWelcomeMessage } from "@/websocket/events/other/handlers/getWelcomeMessage";
import { logEvent } from "@/websocket/events/other/handlers/logEvent";
import { ping } from "@/websocket/events/other/handlers/ping";

const otherHandlers = {
  getAllStuff,
  getCountries,
  getWelcomeMessage,
  logEvent,
  ping,
};

export { otherHandlers };
