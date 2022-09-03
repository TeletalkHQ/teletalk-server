const { randomMaker } = require("utility-store/src/classes/RandomMaker");

class CommonFunctionalities {
  randomStringWithMinLengthOne(length) {
    const finalLength = length === 0 ? 1 : length;
    return randomMaker.randomString(finalLength);
  }
}

const commonFunctionalities = new CommonFunctionalities();

module.exports = { CommonFunctionalities, commonFunctionalities };
