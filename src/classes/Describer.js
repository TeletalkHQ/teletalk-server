const { getTestUsersFromState } = require("@/functions/utilities/testUtils");
const { customRequest } = require("@/classes/CustomRequest");

class Describer {
  constructor() {
    this.state = {
      testUsers: {},
    };
  }

  addInitialDescribe(baseUrl, routeObject, testUserNumber) {
    describe("", () => {
      it("should fill testUsers object and set customRequest properties", () => {
        customRequest.setRequestRequirements(baseUrl, routeObject);

        this.state.testUsers = getTestUsersFromState();

        customRequest.setMainTokenByUserObject(
          this.state.testUsers[`testUser_${testUserNumber}`]
        );
      });
    });
  }

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
