import { authManager } from "@/classes/AuthManager";
import { clientStore } from "@/classes/ClientStore";
import { randomMaker } from "$/classes/RandomMaker";

import { helpers } from "$/helpers";

import { models } from "@/models";

import { errors } from "@/variables/errors";

import { routesWithAuth } from "@/websocket/events";

describe("checkCurrentUserStatus middleware success tests", () => {
  //TODO: Add tests: checkCurrentUserStatus middleware success tests
});

describe("checkCurrentUserStatus middleware fail tests", () => {
  const routesWithoutSignup = routesWithAuth.filter(
    (i) => i.name !== "verify" && i.name !== "createNewUser"
  );

  for (const route of routesWithoutSignup) {
    const title = helpers.createFailTestMessage(
      errors.CURRENT_USER_NOT_EXIST,
      route
    );

    it(title, async () => {
      const wrongSessionId = randomMaker.string(
        models.native.userId.maxlength.value
      );
      const session = authManager.signSession({
        sessionId: wrongSessionId,
      });

      const { socket } = await randomMaker.user();

      const client = (await clientStore.find(socket.clientId))!;
      await clientStore.update(socket.clientId, {
        ...client,
        session,
      });

      const data = helpers.generateDynamicData(route.inputFields);
      await helpers.requesters[route.name as keyof typeof helpers.requesters](
        socket
      ).sendFullFeaturedRequest(data, errors.CURRENT_USER_NOT_EXIST);
    });
  }

  for (const route of routesWithoutSignup) {
    const title = helpers.createFailTestMessage(
      errors.CURRENT_SESSION_NOT_EXIST,
      route
    );

    it(title, async () => {
      const { socket } = await randomMaker.user();

      const client = (await clientStore.find(socket.clientId))!;
      const sessionId = authManager.getSessionId(client.session);
      const newSession = authManager.signSession({
        sessionId,
      });
      await clientStore.update(socket.clientId, {
        ...client,
        session: newSession,
      });

      const data = helpers.generateDynamicData(route.inputFields);
      await helpers.requesters[route.name as keyof typeof helpers.requesters](
        socket
      ).sendFullFeaturedRequest(data, errors.CURRENT_SESSION_NOT_EXIST);
    });
  }
});
