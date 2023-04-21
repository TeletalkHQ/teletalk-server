// import cluster from "cluster";
// import os from "os";
// import { setupMaster, setupWorker } from "@socket.io/sticky";
// import { setupPrimary, createAdapter } from "@socket.io/cluster-adapter";
// import { Server } from "socket.io";

import "@/configs/customGlobals.ts";
import "@/helpers/requireDotenv";

import PrettyError from "pretty-error";

import { appConfigs } from "@/classes/AppConfigs";
import { envManager } from "@/classes/EnvironmentManager";

import { helpers } from "@/helpers";

import { requirements } from "@/requirements";

import { crateHttpServer } from "@/servers/http";
import { websocketServer } from "@/servers/websocket";

PrettyError.start();

const listeningListener = () => {
  const { NODE_ENV } = envManager.getEnvironment();

  logger.info(
    `Server is running in ${NODE_ENV} mode on port ${
      appConfigs.getConfigs().server.port
    }`
  );
};

const runner = async () => {
  // if (cluster.isPrimary) {
  await appConfigs.setup();

  // utilities.logEnvironments();

  // const NUM_WORKERS = os.cpus().length;

  // logger.debug(`Master ${process.pid} is running`);

  // const httpServer = crateHttpServer();

  // setupMaster(httpServer, {
  //   loadBalancingMethod: "round-robin",
  // });

  // setupPrimary();

  // httpServer.listen(PORT);

  // for (let i = 0; i < NUM_WORKERS; i++) cluster.fork();
  // } else {
  await requirements.database();

  const httpServer = crateHttpServer(helpers.clientIdGenerator);
  httpServer.listen(envManager.getEnvironment().PORT, listeningListener);
  websocketServer(httpServer);

  // logger.debug(`Worker ${process.pid} started`);

  // const httpServer = crateHttpServer();
  // const io = new Server(httpServer, {
  //   cors: { credentials: true, origin: true },
  // });
  // io.adapter(createAdapter());
  // setupWorker(io);

  // io.on("connection", (socket) => {
  //   logger.debug("user connected", socket.id);
  // });
  // }
};

if (envManager.getEnvironment().SELF_EXEC) runner();

export { runner };
