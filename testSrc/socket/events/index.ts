import { socketEventBuilder } from "~/classes/SocketEventBuilder";
import {
  eventsWithAuth,
  eventsWithoutAuth,
  events as mainEvents,
} from "~/socket/events";

export const events = [...mainEvents];

export const unknownEvent = socketEventBuilder()
  .create()
  //@ts-ignore
  .name("unknownEvent")
  .handler(() => ({ data: {} }))
  .inputFields({})
  .outputFields({})
  .build();

export const eventsWithoutDisconnect = events.filter(
  (i) => i.name !== "disconnect"
);

export { eventsWithAuth, eventsWithoutAuth };
