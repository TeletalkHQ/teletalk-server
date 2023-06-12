import { clientManager } from "~/classes/ClientIdManager";
import { clientStore } from "~/classes/ClientStore";
import { clientInitializer } from "$/classes/ClientInitializer";
import { randomMaker } from "$/classes/RandomMaker";

import { helpers } from "$/helpers";

import { RequesterCollection } from "$/types";

import { errors } from "~/variables";

import { routesWithAuth } from "~/websocket/events";

describe("checkCurrentUser middleware fail tests", () => {
  routesWithAuth
    .filter((i) => i.name !== "verify" && i.name !== "createNewUser")
    .forEach((route) => {
      it(
        helpers.createFailTestMessage(errors.currentClientNotExist, route.name),
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

          const data = helpers.generateDynamicData(route.inputFields);
          await helpers.requesterCollection[
            route.name as keyof RequesterCollection
          ](ci.getClient()).sendFullFeaturedRequest(
            data,
            errors.currentClientNotExist
          );
        }
      );
    });
});
