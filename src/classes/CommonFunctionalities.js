const { randomMaker } = require("utility-store/src/classes/RandomMaker");

class CommonFunctionalities {
  randomStringWithMinLengthOne(length) {
    const finalLength = length === 0 ? 1 : length;
    return randomMaker.randomString(finalLength);
  }

  controllerCatchResponse(error, res) {
    res.errorCollector(error);
    res.errorResponser();
  }

  controllerSuccessResponse(res, data) {
    res.checkDataAndResponse(data);
  }
}

const commonFunctionalities = new CommonFunctionalities();

module.exports = { CommonFunctionalities, commonFunctionalities };
