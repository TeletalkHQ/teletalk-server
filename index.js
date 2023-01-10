const { crashServer } = require("./src/utilities/utilities");

const startApp = async () => {
  const NODE_ENV = process.env.NODE_ENV;

  if (NODE_ENV === "production") return require("./build");

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
