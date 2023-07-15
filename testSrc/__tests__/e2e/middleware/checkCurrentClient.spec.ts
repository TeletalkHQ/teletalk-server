import { clientManager } from "~/classes/ClientIdManager";
import { clientStore } from "~/classes/ClientStore";
import { errorStore } from "~/classes/ErrorStore";
import { eventsWithAuth } from "~/websocket/events";

import { clientInitializer } from "@/classes/ClientInitializer";
import { randomMaker } from "@/classes/RandomMaker";
import { RequesterCollection } from "@/types";
import { utils } from "@/utils";

const filteredEvents = eventsWithAuth.filter(
  (i) => i.name !== "verify" && i.name !== "createNewUser"
);

describe("checkCurrentUser middleware fail tests", () => {
  for (const event of filteredEvents) {
    it(
      utils.createFailTestMessage(
        errorStore.find("CURRENT_CLIENT_NOT_EXIST"),
        event.name
      ),
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

        const data = utils.generateDynamicData(event.inputFields);
        await utils.requesterCollection[
          event.name as keyof RequesterCollection
        ](ci.getClient()).sendFullFeaturedRequest(
          data as any,
          errorStore.find("CURRENT_CLIENT_NOT_EXIST")
        );
      }
    );
  }
});
