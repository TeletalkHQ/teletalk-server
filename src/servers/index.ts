// const cluster = require("cluster");
// const os = require("os");

require("pretty-error").start();

require("module-alias/register");
require("@/variables/others/customGlobals");
require("@/helpers/requireDotenv");

const { envManager } = require("@/classes/EnvironmentManager");

const requirements = require("@/requirements");

const { crateHttpServer } = require("@/servers/http");
const { websocketServer } = require("@/servers/websocket");

const { logEnvironments } = require("@/utilities/utilities");
// const { setupMaster, setupWorker } = require("@socket.io/sticky");
// const { setupPrimary, createAdapter } = require("@socket.io/cluster-adapter");
// const { Server } = require("socket.io");

const { NODE_ENV, PORT, SELF_EXEC } = envManager.getAllLocalEnvironments();

const EXACT_PORT =
  PORT || envManager.getEnvironment(envManager.ENVIRONMENT_KEYS.PORT_DEFAULT);

const serverListenerCb = () => {
  logger.info(`Server is running in ${NODE_ENV} mode on port ${EXACT_PORT}`);
};

const runner = async () => {
  // if (cluster.isPrimary) {
  logEnvironments();

  // const NUM_WORKERS = os.cpus().length;

  // logger.log(`Master ${process.pid} is running`);

  // const httpServer = crateHttpServer();

  // setupMaster(httpServer, {
  //   loadBalancingMethod: "round-robin",
  // });

  // setupPrimary();

  // httpServer.listen(EXACT_PORT);

  // for (let i = 0; i < NUM_WORKERS; i++) cluster.fork();
  // } else {
  await requirements.database();
  const httpServer = crateHttpServer();
  websocketServer(httpServer);
  httpServer.listen(EXACT_PORT, serverListenerCb);

  // logger.log(`Worker ${process.pid} started`);

  // const httpServer = crateHttpServer();
  // const io = new Server(httpServer, {
  //   cors: { credentials: true, origin: true },
  // });
  // io.adapter(createAdapter());
  // setupWorker(io);

  // io.on("connection", (socket) => {
  //   logger.log("user connected", socket.id);
  // });
  // }
};

if (SELF_EXEC) runner();

module.exports = {
  runner,
};
