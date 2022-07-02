class Describer {
  constructor() {
    this.state = {
      testUsers: {},
    };
  }

  addInitialDescribe() {}

  addDescribeIt(cb, describeMsg = "", itMsg = "") {
    describe(describeMsg, () => {
      it(itMsg, async () => {
        await cb();
      });
    });
  }
}

const describer = new Describer();

module.exports = { describer, Describer };
