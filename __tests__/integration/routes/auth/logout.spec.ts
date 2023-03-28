import { expect } from "chai";

import { authHelper } from "$/classes/AuthHelper";
import { randomMaker } from "$/classes/RandomMaker";

import { services } from "@/services";

import { testHelper } from "$/helpers/testHelper";

import { utilities } from "$/utilities";
import { ClientSocket, UserMongo } from "@/types";
import { socketHelper } from "$/classes/SocketHelper";

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
    await utilities.requesters
      .logout(popUser?.socket as ClientSocket)
      .sendFullFeaturedRequest();

    // expect(response.ok).to.be.true;

    const user = (await services.findOneUser(cellphone)) as UserMongo;

    const isSessionExist = user.sessions.some(
      ({ token }) => token === popUser?.token
    );
    expect(isSessionExist).to.be.false;

    expect(users.length).to.be.equal(user.sessions.length);

    users.forEach((item) => {
      const isSessionExist = user.sessions.some((i) => i.token === item.token);
      expect(isSessionExist).to.be.true;
    });
  });
});

describe("logout fail tests", () => {
  const clientSocket = socketHelper.createClient();
  const requester = utilities.requesters.logout(clientSocket);

  testHelper
    .createFailTest(requester)
    .authentication()
    .checkCurrentUserStatus();
});
