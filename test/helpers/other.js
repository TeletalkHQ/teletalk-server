const { randomMaker } = require("$/classes/RandomMaker");

const configureFailTestRequester = (requester) => {
  beforeAll(async () => {
    const { token } = await randomMaker.user();
    requester.setToken(token);
  });
};

const otherHelpers = { configureFailTestRequester };

module.exports = { otherHelpers };
