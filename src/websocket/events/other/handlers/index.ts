import { SocketHandlerPicker } from "~/types";
import { getCountries } from "~/websocket/events/other/handlers/getCountries";
import { getStuff } from "~/websocket/events/other/handlers/getStuff";
import { getWelcomeMessage } from "~/websocket/events/other/handlers/getWelcomeMessage";
import { ping } from "~/websocket/events/other/handlers/ping";

type OtherHandlers = SocketHandlerPicker<
  "getCountries" | "getStuff" | "getWelcomeMessage" | "ping"
>;

const otherHandlers: OtherHandlers = {
  getCountries,
  getStuff,
  getWelcomeMessage,
  ping,
};

export { otherHandlers };
