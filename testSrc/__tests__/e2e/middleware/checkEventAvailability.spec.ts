import { clientInitializer } from "$/classes/ClientInitializer";
import { requesterMaker } from "$/classes/Requester";

import { helpers } from "$/helpers";

import { SocketRoute } from "@/types";
import { ClientSocket } from "$/types";

import { errors } from "@/variables";

import { routes } from "$/websocket/events";
import { arrayOfRoutes } from "@/websocket/events";

const createRequester = (socket: ClientSocket, route: SocketRoute) =>
  requesterMaker(socket, route);

await helpers.asyncDescribe(
  "checkEventAvailability middleware fail test",
  async () => {
    const clientSocket = (
      await clientInitializer().createComplete()
    ).getClient();

    return () => {
      const message = helpers.createFailTestMessage(
        errors.routeNotFound,
        routes.unknownRoute.name
      );

      it(message, async () => {
        await createRequester(clientSocket, routes.unknownRoute)
          .setError(errors.eventNotFound)
          .sendFullFeaturedRequest();
      });

      for (const route of arrayOfRoutes) {
        it(`should not get error: routeNotFound - ${route.name}`, async () => {
          const requester = createRequester(clientSocket, route);
          await requester.sendRequest();

          const {
            data: { errors: responseErrors },
          } = requester.getResponse();

          const { reason: expectedReason } = errors.routeNotFound;
          expect(responseErrors?.[expectedReason]).toBeFalsy();
        });
      }
    };
  }
);
