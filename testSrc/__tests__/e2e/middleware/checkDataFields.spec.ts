import { EventName } from "~/types";
import { errors } from "~/variables";
import { events } from "~/websocket/events";

import { randomMaker } from "@/classes/RandomMaker";
import { requesterMaker } from "@/classes/Requester";
import { helpers } from "@/helpers";

await helpers.asyncDescribe("checkBodyFields middleware tests", async () => {
  const { socket } = await randomMaker.user();

  const eventsWithInputFields = events.filter(
    (i) => Object.keys(i.inputFields).length
  );

  const eventsWithInputFieldsExceptAuth = eventsWithInputFields.filter(
    (i) =>
      !(["signIn", "verify", "createNewUser"] as EventName[]).includes(i.name)
  );

  return () => {
    for (const event of eventsWithInputFieldsExceptAuth) {
      const title = helpers.createFailTestMessage(
        errors.inputFieldsMissing,
        event.name
      );

      it(title, async () => {
        await requesterMaker(socket, event as any)
          .setError(errors.inputFieldsMissing)
          .setOptions({ shouldFilterRequestData: false })
          .sendFullFeaturedRequest();
      });
    }
  };
});
