const path = require("path");

const NODE_ENV = process.env.NODE_ENV;
const nodeEnvValues = {
  production: "production",
  production_local: "production_local",
};

const startApp = async () => {
  logEnvironments();

  if (isProduction()) {
    const { runner } = require(path.join(__dirname, "build"));
    return runner();
  }

  if (NODE_ENV.includes("test")) {
    const requirements = require(path.join(__dirname, "requirements"));
    await requirements.mainServer();
    await requirements.testServer();
    try {
      require(path.join(__dirname, "test"));
      run();
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  } else {
    const { runner } = require(path.join(__dirname, "src", "servers"));
    runner();
  }
};

const logEnvironments = () => console.log(sortEnvironments());

const sortEnvironments = () =>
  Object.entries(process.env)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => a.key.localeCompare(b.key))
    .reduce((prevValue, currentValue) => {
      prevValue[currentValue.key] = currentValue.value;
      return prevValue;
    }, {});

const isProduction = () =>
  NODE_ENV === nodeEnvValues.production ||
  NODE_ENV === nodeEnvValues.production_local;

startApp();
