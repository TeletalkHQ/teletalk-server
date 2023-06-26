import { errors } from "~/variables";
import { events, eventsArray } from "~/websocket/events";

import { randomMaker } from "@/classes/RandomMaker";
import { requesterMaker } from "@/classes/Requester";
import { helpers } from "@/helpers";

await helpers.asyncDescribe("checkBodyFields middleware tests", async () => {
  const { socket } = await randomMaker.user();

  const eventsWithInputFields = eventsArray.filter(
    (i) => Object.keys(i.inputFields).length
  );

  const eventsWithInputFieldsExceptAuth = eventsWithInputFields.filter(
    (i) =>
      ![
        events.signIn.name,
        events.verify.name,
        events.createNewUser.name,
      ].includes(i.name)
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
