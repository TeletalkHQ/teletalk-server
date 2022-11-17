const http = require("http");

const { trier } = require("utility-store/src/classes/Trier");

const { app } = require("@/app");

const { envManager } = require("@/classes/EnvironmentManager");

const { crashServer } = require("@/functions/utilities/utilities");

const { ioFunctions } = require("@/socket/io");

const server = http.createServer(app);

//* PORT coming from heroku, so don't touch it!
const { NODE_ENV, PORT } = envManager.getAllLocalEnvironments();

const EXACT_PORT =
  PORT ||
  envManager.getEnvironment(envManager.ENVIRONMENT_KEYS.SERVER_DEFAULT_PORT);

const socketServer = () => {
  ioFunctions.sio(server);

  ioFunctions.io.on("connection", (socket) => {
    logger.info("User connected.");

    logger.info(socket.id);

    socket.on("disconnect", (...params) => {
      logger.info(`${socket.id} disconnected`);

      logger.info(params);
    });
  });
};

const serverListenerCb = () => {
  logger.info(`Server is running in ${NODE_ENV} mode on port ${EXACT_PORT}`);
};
const expressServer = () => {
  server.listen(EXACT_PORT, serverListenerCb);
};

const testSms = () => {
  const https = require("https");
  const { envManager } = require("~/src/classes/EnvironmentManager");

  const { SMS_PROVIDER_SENDER, SMS_PROVIDER_TOKEN, SMS_PROVIDER_URL } =
    envManager.getAllLocalEnvironments();

  const data = JSON.stringify({
    from: SMS_PROVIDER_SENDER,
    to: "09012700470",
    text: "test sms",
  });

  const options = {
    headers: {
      "Content-Length": data.length,
      "Content-Type": "application/json",
    },
    hostname: SMS_PROVIDER_URL,
    method: "POST",
    path: `/api/send/simple/${SMS_PROVIDER_TOKEN}`,
    port: 443,
  };

  const req = https.request(options, (res) => {
    console.log("statusCode: " + res.statusCode);

    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.write(data);
  req.end();
};
const tryToStartServers = () => {
  socketServer();
  expressServer();
  testSms();
};

const startServers = async () => {
  trier(startServers.name).try(tryToStartServers).catch(crashServer);
};

startServers();

module.exports = { app, server };
