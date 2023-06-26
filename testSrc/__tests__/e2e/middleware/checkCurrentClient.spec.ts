import { clientManager } from "~/classes/ClientIdManager";
import { clientStore } from "~/classes/ClientStore";
import { errors } from "~/variables";
import { eventsWithAuth } from "~/websocket/events";

import { clientInitializer } from "@/classes/ClientInitializer";
import { randomMaker } from "@/classes/RandomMaker";
import { helpers } from "@/helpers";
import { RequesterCollection } from "@/types";

describe("checkCurrentUser middleware fail tests", () => {
  eventsWithAuth
    .filter((i) => i.name !== "verify" && i.name !== "createNewUser")
    .forEach((event) => {
      it(
        helpers.createFailTestMessage(errors.currentClientNotExist, event.name),
        async () => {
          const { socket } = await randomMaker.user();
          const newAuthClient = await clientManager.signClient();
          const {
            payload: { clientId: newClientId },
          } = await clientManager.verifyClient(newAuthClient);
          const ci = clientInitializer();
          ci.setClient(newAuthClient).makeClientCookie().initClient().connect();

          const client = (await clientStore.find(socket.clientId))!;
          await clientStore.add(newClientId, {
            ...client,
            userId: client.userId,
          });

          const data = helpers.generateDynamicData(event.inputFields);
          await helpers.requesterCollection[
            event.name as keyof RequesterCollection
          ](ci.getClient()).sendFullFeaturedRequest(
            data as any,
            errors.currentClientNotExist
          );
        }
      );
    });
});
