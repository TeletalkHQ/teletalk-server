import { utilities } from "$/utilities";

import { randomMaker } from "$/classes/RandomMaker";
import { requesterCreator } from "$/classes/Requester";

import { ClientSocket } from "@/types";

import { errors } from "@/variables/errors";

import { arrayOfRoutes, routes } from "@/websocket/events";

describe("checkBodyFields middleware tests", () => {
  let socket: ClientSocket;

  before(async () => {
    socket = (await randomMaker.user()).socket;
  });
  //? Filter routes which has at least one input field
  const routesWithInputFields = arrayOfRoutes.filter(
    (i) => Object.keys(i.inputFields).length
  );

  const routesWithoutAuth = routesWithInputFields.filter(
    (i) =>
      ![
        routes.signIn.name,
        routes.verify.name,
        routes.createNewUser.name,
      ].includes(i.name)
  );

  for (const route of routesWithoutAuth) {
    const message = utilities.createFailTestMessage(
      errors.INPUT_FIELDS_MISSING,
      route.name
    );
    it(message, async () => {
      await requesterCreator(socket, route)
        .setError(errors.INPUT_FIELDS_MISSING)
        .setOptions({ shouldFilterRequestData: false })
        .sendFullFeaturedRequest();
    });
  }
});
