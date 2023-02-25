import { randomMaker } from "$/classes/RandomMaker";

const configureFailTestRequester = (requester) => {
  beforeAll(async () => {
    const { token } = await randomMaker.user();
    requester.setToken(token);
  });
};

const otherHelpers = { configureFailTestRequester };

export { otherHelpers };
