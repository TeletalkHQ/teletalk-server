import { SocketRoute } from "~/types";
import { errors } from "~/variables";
import { arrayOfRoutes } from "~/websocket/events";

import { clientInitializer } from "@/classes/ClientInitializer";
import { requesterMaker } from "@/classes/Requester";
import { helpers } from "@/helpers";
import { ClientSocket } from "@/types";
import { routes } from "@/websocket/events";

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

          const { errors: responseErrors } = requester.getResponse();

          const { reason: expectedReason } = errors.routeNotFound;

          const err = responseErrors?.find((i) => i.reason === expectedReason);

          expect(err?.reason).toBeFalsy();
        });
      }
    };
  }
);
