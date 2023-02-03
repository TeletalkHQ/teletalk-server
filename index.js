require("module-alias/register");
require("@/variables/others/customGlobals");
require("@/helpers/requireDotenv").requireDotenv();

const { commonUtilities } = require("@/classes/CommonUtilities");
const { envManager } = require("@/classes/EnvironmentManager");

const { crashServer } = require("@/utilities/utilities");

const startApp = async () => {
  logEnvironments();
  if (commonUtilities.isProduction()) {
    const { runner } = require("./build");
    return runner();
  }

  const requirements = require("./requirements");

  await requirements.mainServer();

  const NODE_ENV = envManager.getNodeEnv();
  if (NODE_ENV.includes("test")) {
    await requirements.testServer();
    try {
      require("$");
      run();
    } catch (error) {
      crashServer(error);
    }
  } else {
    const { runner } = require("@/servers");

    runner();
  }
};

const logEnvironments = () => {
  const envs = sortEnvironments();
  console.log(envs);
};

const sortEnvironments = () =>
  Object.entries(process.env)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => a.key.localeCompare(b.key))
    .reduce((prevValue, currentValue) => {
      prevValue[currentValue.key] = currentValue.value;
      return prevValue;
    }, {});

startApp();
