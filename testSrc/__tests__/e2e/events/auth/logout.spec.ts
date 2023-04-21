import chai from "chai";

import { authHelper } from "$/classes/AuthHelper";
import { authManager } from "@/classes/AuthManager";
import { clientStore } from "@/classes/ClientStore";
import { randomMaker } from "$/classes/RandomMaker";

import { helpers } from "$/helpers";

import { services } from "@/services";

import { UserMongo } from "@/types";

describe("logout success tests", () => {
  it("should get response.ok:true logging out user", async () => {
    const cellphone = randomMaker.cellphone();
    const fullName = randomMaker.fullName();
    const ah = authHelper(cellphone, fullName);

    await ah.createComplete();

    const client = (await clientStore.find(ah.getClientId()))!;
    const clients = [{ session: client.session, socket: ah.getClientSocket() }];

    for (let i = 0; i < 9; i++) {
      await ah.signIn();
      await ah.verify();
      const { session } = (await clientStore.find(ah.getClientId()))!;
      clients.push({ session, socket: ah.getClientSocket() });
    }

    await helpers.requesterCollection
      .logout(ah.getClientSocket())
      .sendFullFeaturedRequest();

    const loggedOutClient = clients.pop();
    const sessionId = authManager.getSessionId(clients[0].session);
    const userFromDb = (await services.findOneUser({
      userId: sessionId,
    })) as UserMongo;
    const isSessionExist = userFromDb.sessions.some(
      ({ session }) => session === loggedOutClient!.session
    );
    chai.expect(isSessionExist).to.be.false;

    clients.forEach((item) => {
      const isSessionExist = userFromDb.sessions.some(
        (i) => i.session === item.session
      );
      chai.expect(isSessionExist).to.be.true;
    });
  });
});

// await helpers.asyncDescribe("logout fail tests", async () => {
//   const clientSocket = (await clientInitializer().createComplete()).getClient();
//   const requester = helpers.requesterCollection.logout(clientSocket);

//   return () => {
//     e2eFailTestInitializerHelper(requester);
//   };
// });
