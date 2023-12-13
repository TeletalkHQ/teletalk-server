import {
  GetCountriesIO,
  GetStuffIO,
  GetWelcomeMessageIO,
  JoinIO,
  PingIO,
} from "teletalk-type-store";

import { socketEventBuilder } from "~/classes/SocketEventBuilder";
import { fields } from "~/variables";

import { handlers } from "./handlers";

const builder = socketEventBuilder();

const getCountries = builder
  .create<GetCountriesIO>()
  .name("getCountries")
  .noAuth()
  .outputFields({
    countries: fields.statics.array(fields.collection.country),
  })
  .handler(handlers.getCountries)
  .build();

const getStuff = builder
  .create<GetStuffIO>()
  .name("getStuff")
  .noAuth()
  .handler(handlers.getStuff)
  .build();

const getWelcomeMessage = builder
  .create<GetWelcomeMessageIO>()
  .name("getWelcomeMessage")
  .noAuth()
  .outputFields({
    welcomeMessage: fields.single.welcomeMessage,
  })
  .handler(handlers.getWelcomeMessage)
  .build();

const ping = builder
  .create<PingIO>()
  .name("ping")
  .noAuth()
  .outputFields({ pong: fields.statics.string })
  .handler(handlers.ping)
  .build();

const join = builder
  .create<JoinIO>()
  .name("join")
  .handler(handlers.join)
  .method("once")
  .build();

export const other = {
  events: [getCountries, getStuff, getWelcomeMessage, join, ping],
  handlers,
};
