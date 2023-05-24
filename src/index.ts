// import cluster from "cluster";
// import os from "os";
// import { setupMaster, setupWorker } from "@socket.io/sticky";
// import { setupPrimary, createAdapter } from "@socket.io/cluster-adapter";
// import { Server } from "socket.io";

import PrettyError from "pretty-error";
import address from "address";

import { appConfigs } from "@/classes/AppConfigs";

import { crateHttpServer } from "@/http";

import { requirements } from "@/requirements";

import { websocketServer } from "@/websocket";

PrettyError.start();

await appConfigs.setup();

const listeningListener = () => {
  const { ENVIRONMENT } = appConfigs.getConfigs().APP;

  logger.info(
    `Server is running in ${ENVIRONMENT} mode on port ${
      appConfigs.getConfigs().APP.PORT
    }`,
    `url: http://${address.ip()}:${appConfigs.getConfigs().APP.PORT}`
  );
};

const runner = async () => {
  // if (cluster.isPrimary) {

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

  const httpServer = crateHttpServer();
  httpServer.listen(appConfigs.getConfigs().APP.PORT, listeningListener);
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

if (appConfigs.getConfigs().APP.SELF_EXEC) await runner();

export { runner };
