import { Requester } from "$/classes/Requester";
import { randomMaker } from "$/classes/RandomMaker";

const configureFailTestRequester = (requester: Requester) => {
  before(async () => {
    const { socket } = await randomMaker.user();
    requester.setSocket(socket);
  });
};

const otherHelpers = { configureFailTestRequester };

export { otherHelpers };
