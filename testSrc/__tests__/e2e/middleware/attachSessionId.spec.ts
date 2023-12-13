import { clientInitializer } from "@/classes/ClientInitializer";
import { randomMaker } from "@/classes/RandomMaker";
import { requesterMaker } from "@/classes/Requester";
import { eventsWithoutDisconnect } from "@/socket/events";
import { utils } from "@/utils";

const filteredEvents = eventsWithoutDisconnect.filter(
  (i) => !["getStuff", "ping", "signIn"].includes(i.name)
);

await utils.asyncDescribe(
  utils.createTestMessage.unitFailDescribe("attachSessionId", "middleware"),
  async () => {
    const initializer = clientInitializer();
    await initializer.init();
    initializer.reinitializeWithSession(randomMaker.sessionId());

    return () => {
      for (const event of filteredEvents) {
        const title = utils.createTestMessage.unitFailTest(
          event.name,
          "middleware",
          "SESSION_ID_INVALID"
        );
        it(title, async () => {
          await requesterMaker(initializer.getClient(), event as any).emitFull(
            {},
            "SESSION_ID_INVALID"
          );
        });
      }

      for (const event of filteredEvents) {
        const title = utils.createTestMessage.unitFailTest(
          event.name,
          "middleware",
          "SESSION_NOT_FOUND"
        );
        it(title, async () => {
          const client = (await clientInitializer().init())
            .connect()
            .getClient();

          await requesterMaker(client, event as any).emitFull(
            {},
            "SESSION_NOT_FOUND"
          );
        });
      }
    };
  }
);
