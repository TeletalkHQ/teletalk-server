const { envManager } = require("@/classes/EnvironmentManager");
const { crashServer } = require("./src/utilities/utilities");

const startApp = async () => {
  const NODE_ENV = envManager.getNodeEnv();

  if (NODE_ENV === envManager.getNodeEnvValues().production)
    return require("./build");

  const startupRequirements = require("./startupRequirements");

  await startupRequirements.mainServer();

  if (NODE_ENV.includes("test")) {
    await startupRequirements.testServer();
    try {
      require("$");
      run();
    } catch (error) {
      crashServer(error);
    }
  } else require("@/server");
};

startApp();
