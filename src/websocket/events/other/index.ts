import { socketEventBuilder } from "~/classes/SocketEventBuilder";
import {
  GetCountriesIO,
  GetStuffIO,
  GetWelcomeMessageIO,
  PingIO,
} from "~/types";
import { fields } from "~/variables";
import { otherHandlers } from "~/websocket/events/other/handlers";

const builder = socketEventBuilder();

const getCountries = builder
  .create<GetCountriesIO>()
  .name("getCountries")
  .noAuth()
  .outputFields({
    countries: fields.statics.array(fields.collection.country),
  })
  .handler(otherHandlers.getCountries)
  .build();

const getStuff = builder
  .create<GetStuffIO>()
  .name("getStuff")
  .noAuth()
  .handler(otherHandlers.getStuff)
  .build();

const getWelcomeMessage = builder
  .create<GetWelcomeMessageIO>()
  .name("getWelcomeMessage")
  .noAuth()
  .outputFields({
    welcomeMessage: fields.single.welcomeMessage,
  })
  .handler(otherHandlers.getWelcomeMessage)
  .build();

const ping = builder
  .create<PingIO>()
  .name("ping")
  .handler(otherHandlers.ping)
  .build();

export const other = {
  events: {
    getCountries,
    getStuff,
    getWelcomeMessage,
    ping,
  },
  handlers: otherHandlers,
};
