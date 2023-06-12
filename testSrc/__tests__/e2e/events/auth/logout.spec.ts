import { authHelper } from "$/classes/AuthHelper";
import { clientStore } from "~/classes/ClientStore";
import { randomMaker } from "$/classes/RandomMaker";

import { helpers } from "$/helpers";

import { services } from "~/services";

import { UserMongo } from "~/types";

describe("logout success tests", () => {
  it("should get response.ok:true logging out user", async () => {
    const cellphone = randomMaker.cellphone();
    const fullName = randomMaker.fullName();
    const ah = authHelper(cellphone, fullName);

    await ah.createComplete();

    const clients = [{ clientId: ah.getClientId() }];

    for (let i = 0; i < 9; i++) {
      await ah.signIn();
      await ah.verify();
      clients.push({
        clientId: ah.getClientId(),
      });
    }

    const clientIdToRemove = clients.pop()!.clientId;
    const { userId } = (await clientStore.find(clientIdToRemove))!;

    await helpers.requesterCollection
      .logout(ah.getClientSocket())
      .sendFullFeaturedRequest();

    const userFromDb = (await services.findOneUser({
      userId,
    })) as UserMongo;

    const isClientExist = userFromDb.clients.some(
      ({ clientId }) => clientId === clientIdToRemove
    );
    expect(isClientExist).toBeFalsy();

    clients.forEach((item) => {
      const isClientExist = userFromDb.clients.some(
        (i) => i.clientId === item.clientId
      );
      expect(isClientExist).toBeTruthy();
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
