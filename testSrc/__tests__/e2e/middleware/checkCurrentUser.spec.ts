import { clientStore } from "~/classes/ClientStore";
import { errorStore } from "~/classes/ErrorStore";
import { models } from "~/models";
import { eventsWithAuth } from "~/websocket/events";

import { randomMaker } from "@/classes/RandomMaker";
import { utils } from "@/utils";

describe("checkCurrentUser middleware fail tests", () => {
  eventsWithAuth
    .filter((i) => i.name !== "verify" && i.name !== "createNewUser")
    .forEach((event) => {
      it(
        utils.createFailTestMessage(
          errorStore.find("CURRENT_USER_NOT_EXIST"),
          event.name
        ),
        async () => {
          const wrongUserId = randomMaker.string(
            models.native.userId.maxLength
          );

          const { socket } = await randomMaker.user();

          const client = (await clientStore.find(socket.clientId))!;
          await clientStore.update(socket.clientId, {
            ...client,
            userId: wrongUserId,
          });

          const data = utils.generateDynamicData(event.inputFields);
          await utils.requesterCollection[event.name](
            socket
          ).sendFullFeaturedRequest(
            data as any,
            errorStore.find("CURRENT_USER_NOT_EXIST")
          );
        }
      );
    });
});
