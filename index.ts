import path from "path";

const calcNodeVersion = () => {
  return process.env.npm_config_user_agent
    ?.split("node/v")[1]
    ?.split(" ")[0]
    ?.slice(0, 2);
};

const NODE_ENV = process.env.NODE_ENV;

const NODE_VERSION =
  process.env.NODE_VERSION ||
  process.env.NODE_VERSION_DEFAULT ||
  calcNodeVersion() ||
  18;

const BUILD_FOLDER_NAME = `node${NODE_VERSION.slice(0, 2)}`;

const start = async () => {
  try {
    if (isProduction()) return runProduction();

    if (NODE_ENV.includes("test")) return runTest();

    runDev();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const isProduction = () =>
  ["production", "production_local"].some((i) => i === NODE_ENV);

const runProduction = () =>
  require(path.join(__dirname, "build", BUILD_FOLDER_NAME, "app.js")).runner();

const runTest = async () => {
  const path = getTestServerPath();
  const requirements = getTestServerRequirements(path);
  await runRequirements(requirements);
  run();
};
const getTestServerPath = () => {
  const paths = [__dirname];
  if (NODE_ENV === "test_production_local")
    paths.push("build", BUILD_FOLDER_NAME);
  paths.push("test");
  return path.join(...paths);
};
const getTestServerRequirements = (path) => {
  return require(path).requirements;
};
const runRequirements = async (requirements) => {
  await requirements.database();
  await requirements.testServer();
};

const runDev = () => require(path.join(__dirname, "src", "servers")).runner();

start();
