import { socketRouteBuilder } from "~/classes/routeBuilder/SocketRouteBuilder";

import { SocketRoutePicker } from "~/types";

import { fields } from "~/variables";

import { otherHandlers } from "~/websocket/events/other/handlers";

const builder = socketRouteBuilder();

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
  .name("getWelcomeMessage")
  .noAuth()
  .outputFields({
    welcomeMessage: fields.single.welcomeMessage,
  })
  .handler(otherHandlers.getWelcomeMessage)
  .build();

const ping = builder.create().name("ping").handler(otherHandlers.ping).build();

type OtherRoutes = SocketRoutePicker<
  "getCountries" | "getStuff" | "getWelcomeMessage" | "ping"
>;

const otherRoutes: OtherRoutes = {
  getCountries,
  getStuff,
  getWelcomeMessage,
  ping,
};

export { otherRoutes };
