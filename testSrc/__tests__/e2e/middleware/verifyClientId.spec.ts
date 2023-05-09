import { randomMaker } from "utility-store";

import { clientInitializer } from "$/classes/ClientInitializer";
import { requesterMaker } from "$/classes/Requester";

import { helpers } from "$/helpers";

import { models } from "@/models";

import { errors } from "@/variables";

import { arrayOfRoutes } from "@/websocket/events";

//REFACTOR: fail suit message like this
describe("verifyClientId fail tests", () => {
  for (const route of arrayOfRoutes) {
    const title = helpers.createFailTestMessage(
      errors.clientId_invalid,
      route.name
    );
    it(title, async () => {
      const ci = clientInitializer();
      ci.setClientId(randomMaker.string(models.native.clientId.maxLength));
      ci.makeClientIdCookie();
      ci.create();
      ci.connect();

      await requesterMaker(ci.getClient(), route).sendFullFeaturedRequest(
        {},
        errors.clientId_invalid
      );
    });
  }
});
