import chai from "chai";

import { clientInitializer } from "$/classes/ClientInitializer";
import { requesterMaker } from "$/classes/Requester";

import { helpers } from "$/helpers";

import { SocketRoute } from "@/types";
import { ClientSocket } from "$/types";

import { FIELD_TYPE } from "$/variables";
import { errors } from "@/variables";

import { routes } from "$/websocket/events";
import { arrayOfRoutes } from "@/websocket/events";

const createRequester = (socket: ClientSocket, route: SocketRoute) =>
  requesterMaker(socket, route);

helpers.asyncDescribe(
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

      // .filter(
      //   (i) => i.name !== "disconnect"
      // )
      for (const route of arrayOfRoutes) {
        it(`should not get error: routeNotFound - ${route.name}`, async () => {
          const requester = createRequester(clientSocket, route);
          await requester.sendRequest();

          const {
            data: { errors: responseErrors },
          } = requester.getResponse();

          const { reason: expectedReason } = errors.routeNotFound;
          if (responseErrors?.[expectedReason]) {
            chai
              .expect(responseErrors[expectedReason].reason)
              .to.be.an(FIELD_TYPE.STRING);
            chai
              .expect(responseErrors[expectedReason].reason)
              .not.equal(errors.routeNotFound.reason);
          }
        });
      }
    };
  }
);
