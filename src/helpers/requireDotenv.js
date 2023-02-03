const path = require("path");

const { envManager } = require("@/classes/EnvironmentManager");

const cwd = process.cwd();

const requireDotenv = () => {
  require("dotenv").config({
    path: path.join(cwd, "environments", `${envManager.getNodeEnv()}.env`),
  });
};

module.exports = { requireDotenv };
