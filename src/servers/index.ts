import cluster from "cluster";
import os from "os";

import PrettyError from "pretty-error";

import "@/variables/others/customGlobals";
import "@/helpers/requireDotenv";

import { envManager } from "@/classes/EnvironmentManager";

import { database } from "@/requirements";

import { crateHttpServer } from "@/servers/http";
import { websocketServer } from "@/servers/websocket";

import { logEnvironments } from "@/utilities/utilities";
import { setupMaster, setupWorker } from "@socket.io/sticky";
import { setupPrimary, createAdapter } from "@socket.io/cluster-adapter";
import { Server } from "socket.io";

PrettyError.start();

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
  await database();
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

export { runner };
