//! Require this modules before requiring internal modules ==>
const startupRequirements = require("./startupRequirements");
//! Require this modules before requiring internal modules <==

const { envManager } = require("@/classes/EnvironmentManager");

const startApp = async () => {
  await startupRequirements.mainServer();

  const NODE_ENV = envManager.getNodeEnv();
  if (NODE_ENV.includes("test")) {
    await startupRequirements.testServer();
    require("$/test");
    run();
    return;
  }

  require("@/server");
};

startApp();
