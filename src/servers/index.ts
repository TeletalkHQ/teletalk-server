// import cluster from "cluster";
// import os from "os";
// import { setupMaster, setupWorker } from "@socket.io/sticky";
// import { setupPrimary, createAdapter } from "@socket.io/cluster-adapter";
// import { Server } from "socket.io";

import "@/configs/customGlobals";
import "@/helpers/requireDotenv";

import PrettyError from "pretty-error";

import http from "http";

import { envManager } from "@/classes/EnvironmentManager";

import { requirements } from "@/requirements";

import { websocketServer } from "@/servers/websocket";

import { utilities } from "@/utilities";

PrettyError.start();

const {
  // NODE_ENV,
  // PORT,
  SELF_EXEC,
} = envManager.getEnvironment();

// const EXACT_PORT = PORT || envManager.getEnvironment().PORT_DEFAULT;

// const serverListenerCb = () => {
//   logger.info(`Server is running in ${NODE_ENV} mode on port ${EXACT_PORT}`);
// };

const runner = async () => {
  // if (cluster.isPrimary) {

  utilities.logEnvironments();

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
  const httpServer = http.createServer();
  websocketServer(httpServer);

  // httpServer.listen(EXACT_PORT, serverListenerCb);

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

export { runner };
