import { socketRouteBuilder } from "@/classes/routeBuilder/SocketRouteBuilder";

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
  .noAuth()
  .outputFields({
    countries: fields.statics.array(fields.collection.country),
  })
  .handler(otherHandlers.getCountries)
  .build();

const getStuff = builder
  .create()
  .name("getStuff")
  .noAuth()
  .handler(otherHandlers.getStuff)
  .build();

const getWelcomeMessage = builder
  .create()
  .name("welcomeMessage")
  .noAuth()
  .outputFields({
    welcomeMessage: fields.single.welcomeMessage,
  })
  .handler(otherHandlers.getWelcomeMessage)
  .build();

const logEvent = builder
  .create()
  .name("")
  .noAuth()
  .method("onAny")
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
