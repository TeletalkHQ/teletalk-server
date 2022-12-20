const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { envManager } = require("@/classes/EnvironmentManager");

class CommonFunctionalities {
  randomStringWithMinLengthOne(length) {
    const finalLength = length === 0 ? 1 : length;
    return randomMaker.randomString(finalLength);
  }

  controllerErrorResponse(error, res) {
    res.errorCollector(error);
    res.errorResponser();
  }

  controllerSuccessResponse({ requiredFieldsIndex, ...data }, res) {
    res.checkDataAndResponse(data, requiredFieldsIndex);
  }

  checkAndExecute(condition, callback, ...params) {
    if (condition) {
      return callback(...params);
    }
  }

  isTestServerRunning() {
    const serverNodeEnvValue = envManager.getNodeEnv();
    const { test_development, test_production } = envManager.getNodeEnvValues();

    return [test_development, test_production].includes(serverNodeEnvValue);
  }
}

const commonFunctionalities = new CommonFunctionalities();

module.exports = { CommonFunctionalities, commonFunctionalities };
