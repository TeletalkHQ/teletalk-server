import { clientStore } from "@/classes/ClientStore";
import { randomMaker } from "$/classes/RandomMaker";
import { clientInitializer } from "$/classes/ClientInitializer";

import { helpers } from "$/helpers";
import { helpers as mainHelpers } from "@/helpers";

import { RequesterCollection } from "$/types";

import { errors } from "@/variables";

import { routesWithAuth } from "@/websocket/events";

describe("checkCurrentUser middleware fail tests", () => {
  routesWithAuth
    .filter((i) => i.name !== "verify" && i.name !== "createNewUser")
    .forEach((route) => {
      it(
        helpers.createFailTestMessage(errors.currentClientNotExist, route.name),
        async () => {
          const { socket } = await randomMaker.user();
          const client = (await clientStore.find(socket.clientId))!;
          const newClientId = mainHelpers.signClientId();

          const ci = clientInitializer();
          const newClient = ci
            .setClientId(newClientId)
            .makeClientIdCookie()
            .create()
            .connect()
            .getClient();

          await clientStore.add(newClientId, {
            ...client,
            userId: client.userId,
          });

          const data = helpers.generateDynamicData(route.inputFields);
          await helpers.requesterCollection[
            route.name as keyof RequesterCollection
          ](newClient).sendFullFeaturedRequest(
            data,
            errors.currentClientNotExist
          );
        }
      );
    });
});
