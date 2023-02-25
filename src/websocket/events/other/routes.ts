import { socketRouteBuilder } from "@/classes/routeBuilder/SocketRouteBuilder";

import { EVENTS } from "@/variables/others/events";
import { fields } from "@/variables/others/fields";

import { otherHandlers } from "@/websocket/events/other/handlers";

const builder = socketRouteBuilder();

// const disconnect = builder
//   .create()
//   .name("disconnect")
//   .handler(otherHandlers.disconnect)
//   .build();

const getCountries = builder
  .create()
  .name("getCountries")
  .outputFields([
    {
      countries: fields.statics.array(fields.collection.country),
    },
  ])
  .handler(otherHandlers.getCountries)
  .build();

const getStuff = builder
  .create()
  .name("getStuff")
  .inputFields({
    language: fields.single.language,
  })
  .handler(otherHandlers.getStuff)
  .build();

const getWelcomeMessage = builder
  .create()
  .name("welcomeMessage")
  .outputFields([
    {
      welcomeMessage: fields.single.welcomeMessage,
    },
  ])
  .handler(otherHandlers.getWelcomeMessage)
  .build();

const logEvent = builder
  .create()
  .name("")
  .method(EVENTS.ON_ANY)
  .handler(otherHandlers.logEvent)
  .build();

const ping = builder.create().name("ping").handler(otherHandlers.ping).build();

const otherRoutes = {
  getCountries,
  getStuff,
  getWelcomeMessage,
  logEvent,
  // disconnect,
  ping,
};

export { otherRoutes };
