const startApp = async () => {
  const NODE_ENV = process.env.NODE_ENV;

  if (NODE_ENV === "production") return require("./build");

  const startupRequirements = require("./startupRequirements");

  await startupRequirements.mainServer();

  if (NODE_ENV.includes("test")) {
    await startupRequirements.testServer();
    require("$/test");
    run();
  } else require("@/server");
};

startApp();

//TODO: Use app here (add all tests need)
