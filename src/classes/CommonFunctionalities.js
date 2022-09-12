const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { envManager } = require("@/classes/EnvironmentManager");

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

  isTestServerRunning() {
    const serverNodeEnvValue = envManager.getNodeEnv();
    const nodeEnvTestValue = envManager.getNodeEnvValues().test;
    const isTestServer = serverNodeEnvValue === nodeEnvTestValue;
    return isTestServer;
  }
}

const commonFunctionalities = new CommonFunctionalities();

module.exports = { CommonFunctionalities, commonFunctionalities };
