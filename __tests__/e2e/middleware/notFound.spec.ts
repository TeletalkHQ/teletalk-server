import { expect } from "chai";

import { requesterCreator } from "$/classes/Requester";
import { socketHelper } from "$/classes/SocketHelper";

import { ClientSocket, SocketRoute } from "@/types";

import { utilities } from "$/utilities";

import { FIELD_TYPE } from "$/variables/fieldType";
import { errors } from "@/variables/errors";

import { routes } from "$/websocket/events";
import { arrayOfRoutes } from "@/websocket/events";

const createRequester = (socket: ClientSocket, route: SocketRoute) =>
  requesterCreator(socket, route);

describe("notFound middleware fail test", () => {
  const clientSocket = socketHelper.createClient();

  const message = utilities.createFailTestMessage(
    errors.ROUTE_NOT_FOUND,
    routes.unknownRoute.name
  );

  it(message, async () => {
    await createRequester(clientSocket, routes.unknownRoute)
      .setError(errors.EVENT_NOT_FOUND)
      .sendFullFeaturedRequest();
  });

  for (const route of arrayOfRoutes) {
    if (route.name === "disconnect") continue;

    it(`should not get error: ROUTE_NOT_FOUND - ${route.name}`, async () => {
      const requester = createRequester(clientSocket, route);
      await requester.sendRequest();

      const {
        data: { errors: responseErrors },
      } = requester.getResponse();

      const { key } = errors.ROUTE_NOT_FOUND;
      if (responseErrors && responseErrors[key]) {
        expect(responseErrors[key].reason).to.be.an(FIELD_TYPE.STRING);
        expect(responseErrors[key].reason).not.equal(
          errors.ROUTE_NOT_FOUND.reason
        );
      }
    });
  }
});
