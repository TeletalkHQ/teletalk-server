import chai from "chai";

import { errorStore } from "~/classes/ErrorStore";
import { sessionManager } from "~/classes/SessionManager";
import { ErrorReason, SocketEvent } from "~/types";

import { clientInitializer } from "@/classes/ClientInitializer";
import { requesterMaker } from "@/classes/Requester";
import { eventsWithoutDisconnect, unknownEvent } from "@/socket/events";
import { ClientSocket } from "@/types";
import { utils } from "@/utils";

const createRequester = (socket: ClientSocket, event: SocketEvent) =>
  requesterMaker(socket, event);

await utils.asyncDescribe(
  "checkEventAvailability middleware fail test",
  async () => {
    const initializer = clientInitializer();
    await initializer.init();
    const session = await sessionManager.sign();
    initializer.reinitializeWithSession(session);
    const clientSocket = initializer.getClient();

    return () => {
      const message = utils.createTestMessage.unitFailTest(
        //@ts-ignore
        "unknownEvent",
        "middleware",
        "EVENT_NOT_FOUND"
      );

      it(message, async () => {
        await createRequester(clientSocket, unknownEvent)
          .setError("EVENT_NOT_FOUND")
          .emitFull();
      });
    };
  }
);

await utils.asyncDescribe(
  utils.createTestMessage.unitSuccessDescribe(
    "checkEventAvailability",
    "middleware"
  ),
  async () => {
    const initializer = clientInitializer();
    await initializer.init();
    const session = await sessionManager.sign();
    initializer.reinitializeWithSession(session);
    const clientSocket = initializer.getClient();

    return () => {
      for (const event of eventsWithoutDisconnect) {
        const message = utils.createTestMessage.unitSuccessTest(
          event.name,
          "middleware",
          `should not get error ${"EVENT_NOT_FOUND" as ErrorReason}`
        );

        it(message, async () => {
          const requester = createRequester(clientSocket, event);
          await requester.emit();

          const { errors: responseErrors } = requester.getResponse();

          const { reason: expectedReason } = errorStore.find("EVENT_NOT_FOUND");

          const error = responseErrors?.find(
            (i) => i.reason === expectedReason
          );

          chai.expect(!!error?.reason).to.be.equal(false);
        });
      }
    };
  }
);
