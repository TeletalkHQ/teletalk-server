const rewire = require("rewire");
const server = rewire("./server");
const serverListenerCB = server.__get__("serverListenerCB");
// @ponicode
describe("serverListenerCB", () => {
  test("0", () => {
    let result = serverListenerCB();
    expect(result).toMatchSnapshot();
  });
});
