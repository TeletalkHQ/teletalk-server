const { expect } = require("chai");

const { authHelper } = require("$/classes/AuthHelper");
const { randomMaker } = require("$/classes/RandomMaker");

const { helpers } = require("$/helpers");

const { services } = require("@/services");

const { testHelper } = require("$/tests/integration/helpers/testHelper");

const { requesters } = require("$/utilities");

describe("logout success tests", () => {
  it("should get response.ok:true logging out user", async () => {
    const cellphone = randomMaker.unusedCellphone();
    const fullName = randomMaker.fullName();
    const helper = authHelper(cellphone, fullName);

    await helper.createComplete();

    const sessions = [helper.getMainTokenFromCreate()];

    for (let i = 0; i < 9; i++) {
      await helper.signIn();
      await helper.verify();
      sessions.push(helper.getMainTokenFromVerify());
    }

    const popToken = sessions.pop();

    const response = await requesters
      .logout()
      .setToken(popToken)
      .sendFullFeaturedRequest();

    expect(response.ok).to.be.true;

    const user = await services.findOneUser(cellphone);

    const isSessionExist = user.sessions.some(
      ({ token }) => token === popToken
    );
    expect(isSessionExist).to.be.false;

    expect(sessions.length).to.be.equal(user.sessions.length);

    sessions.forEach((item) => {
      const isSessionExist = user.sessions.some((i) => i.token === item);
      expect(isSessionExist).to.be.true;
    });
  });
});

describe("logout fail tests", () => {
  const requester = requesters.logout();
  helpers.configureFailTestRequester(requester);

  testHelper
    .createFailTest(requester)
    .authentication()
    .checkCurrentUserStatus();
});
