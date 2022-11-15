//! Require this modules before requiring internal modules ==>
const {
  mainServerRequirements,
  testServerRequirements,
} = require("./startupRequirements");
//! Require this modules before requiring internal modules <==

const { envManager } = require("@/classes/EnvironmentManager");

const startApp = async () => {
  await mainServerRequirements();

  const NODE_ENV = envManager.getNodeEnv();
  if (NODE_ENV.includes("test")) {
    await testServerRequirements();
    require("$/test");
    run();
    return;
  }

  require("@/server");
};

startApp();
