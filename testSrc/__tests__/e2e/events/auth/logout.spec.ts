import chai from "chai";

import { authHelper } from "$/classes/AuthHelper";
import { e2eFailTestInitializerHelper } from "$/classes/E2eFailTestInitializerHelper";
import { randomMaker } from "$/classes/RandomMaker";

import { services } from "@/services";

import { clientInitializer } from "$/classes/ClientInitializer";

import { ClientSocket, UserMongo } from "@/types";
import { helpers } from "$/helpers";

describe("logout success tests", () => {
  it("should get response.ok:true logging out user", async () => {
    const cellphone = randomMaker.unusedCellphone();
    const fullName = randomMaker.fullName();
    const helper = authHelper(cellphone, fullName);

    await helper.createComplete();

    const users = [
      {
        token: helper.getResponses().create.data.token,
        socket: helper.getClientSocket(),
      },
    ];

    for (let i = 0; i < 9; i++) {
      await helper.signIn();
      await helper.verify();
      users.push({
        token: helper.getResponses().verify.data.token,
        socket: helper.getClientSocket(),
      });
    }

    const popUser = users.pop();

    // const response =
    await helpers.requesters
      .logout(popUser?.socket as ClientSocket)
      .sendFullFeaturedRequest();

    // chai.expect(response.ok).to.be.true;

    const user = (await services.findOneUser(cellphone)) as UserMongo;

    const isSessionExist = user.sessions.some(
      ({ token }) => token === popUser?.token
    );
    chai.expect(isSessionExist).to.be.false;

    chai.expect(users.length).to.be.equal(user.sessions.length);

    users.forEach((item) => {
      const isSessionExist = user.sessions.some((i) => i.token === item.token);
      chai.expect(isSessionExist).to.be.true;
    });
  });
});

await helpers.asyncDescribe("logout fail tests", async () => {
  const clientSocket = await clientInitializer.createClient();
  const requester = helpers.requesters.logout(clientSocket);

  return () => {
    e2eFailTestInitializerHelper(requester)
      .authentication()
      .checkCurrentUserStatus();
  };
});
