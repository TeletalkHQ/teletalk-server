const path = require("path");

const NODE_ENV = process.env.NODE_ENV;

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

const runProduction = () => require(path.join(__dirname, "build")).runner();

const runTest = async () => {
  const path = getTestServerPath();
  const requirements = getTestServerRequirements(path);
  console.log(path);
  await runRequirements(requirements);
  run();
};
const getTestServerPath = () => {
  const paths = [__dirname];
  if (NODE_ENV === "test_production_local") paths.push("build");
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
