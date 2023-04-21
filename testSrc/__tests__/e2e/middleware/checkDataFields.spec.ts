import { randomMaker } from "$/classes/RandomMaker";
import { requesterMaker } from "$/classes/Requester";

import { helpers } from "$/helpers";

import { errors } from "@/variables/errors";

import { arrayOfRoutes, routes } from "@/websocket/events";

await helpers.asyncDescribe("checkBodyFields middleware tests", async () => {
  const { socket } = await randomMaker.user();

  const routesWithInputFields = arrayOfRoutes.filter(
    (i) => Object.keys(i.inputFields).length
  );

  const routesWithInputFieldsExceptAuth = routesWithInputFields.filter(
    (i) =>
      ![
        routes.signIn.name,
        routes.verify.name,
        routes.createNewUser.name,
      ].includes(i.name)
  );

  return () => {
    for (const route of routesWithInputFieldsExceptAuth) {
      const title = helpers.createFailTestMessage(
        errors.INPUT_FIELDS_MISSING,
        route.name
      );
      it(title, async () => {
        await requesterMaker(socket, route)
          .setError(errors.INPUT_FIELDS_MISSING)
          .setOptions({ shouldFilterRequestData: false })
          .sendFullFeaturedRequest();
      });
    }
  };
});
