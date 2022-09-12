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

  checkAndExecute(condition, callback, ...params) {
    if (condition) {
      return callback(...params);
    }
  }
}

const commonFunctionalities = new CommonFunctionalities();

module.exports = { CommonFunctionalities, commonFunctionalities };
