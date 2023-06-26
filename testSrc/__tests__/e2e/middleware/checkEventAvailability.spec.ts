import { SocketEvent } from "~/types";
import { errors } from "~/variables";
import { eventsArray } from "~/websocket/events";

import { clientInitializer } from "@/classes/ClientInitializer";
import { requesterMaker } from "@/classes/Requester";
import { helpers } from "@/helpers";
import { ClientSocket } from "@/types";
import { events } from "@/websocket/events";

const createRequester = (socket: ClientSocket, event: SocketEvent) =>
  requesterMaker(socket, event);

await helpers.asyncDescribe(
  "checkEventAvailability middleware fail test",
  async () => {
    const clientSocket = (
      await clientInitializer().createComplete()
    ).getClient();

    return () => {
      const message = helpers.createFailTestMessage(
        errors.eventNotFound,
        events.unknownEvent.name
      );

      it(message, async () => {
        await createRequester(clientSocket, events.unknownEvent)
          .setError(errors.eventNotFound)
          .sendFullFeaturedRequest();
      });

      for (const event of eventsArray) {
        const message = helpers.createFailTestMessage(
          errors.eventNotFound,
          event.name
        );

        it(message, async () => {
          const requester = createRequester(clientSocket, event);
          await requester.sendRequest();

          const { errors: responseErrors } = requester.getResponse();

          const { reason: expectedReason } = errors.eventNotFound;

          const err = responseErrors?.find((i) => i.reason === expectedReason);

          expect(err?.reason).toBeFalsy();
        });
      }
    };
  }
);
