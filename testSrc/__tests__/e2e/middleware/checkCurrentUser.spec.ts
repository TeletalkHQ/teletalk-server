import { clientStore } from "@/classes/ClientStore";
import { randomMaker } from "$/classes/RandomMaker";

import { helpers } from "$/helpers";

import { models } from "@/models";

import { errors } from "@/variables";

import { routesWithAuth } from "@/websocket/events";

describe("checkCurrentUser middleware fail tests", () => {
  routesWithAuth
    .filter((i) => i.name !== "verify" && i.name !== "createNewUser")
    .forEach((route) => {
      it(
        helpers.createFailTestMessage(errors.currentUserNotExist, route.name),
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

          const data = helpers.generateDynamicData(route.inputFields);
          await helpers.requesterCollection[
            route.name as keyof typeof helpers.requesterCollection
          ](socket).sendFullFeaturedRequest(data, errors.currentUserNotExist);
        }
      );
    });
});
