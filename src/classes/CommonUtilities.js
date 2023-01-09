const { randomMaker } = require("utility-store/src/classes/RandomMaker");

const { envManager } = require("@/classes/EnvironmentManager");

//TODO Rename
class CommonUtilities {
  randomStringWithMinLengthOne(length) {
    const finalLength = length === 0 ? 1 : length;
    return randomMaker.string(finalLength);
  }

  controllerErrorResponse(error, res) {
    res.errorCollector(error);
    res.errorResponser();
  }

  controllerSuccessResponse({ requiredFieldsIndex, ...data } = {}, res) {
    res.checkDataAndResponse(data, requiredFieldsIndex);
  }

  isTestServerRunning() {
    const serverNodeEnvValue = envManager.getNodeEnv();
    const { test_development, test_production } = envManager.getNodeEnvValues();

    return [test_development, test_production].includes(serverNodeEnvValue);
  }
}

const commonUtilities = new CommonUtilities();

module.exports = {
  commonUtilities,
  CommonUtilities,
};
